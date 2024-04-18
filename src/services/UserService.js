const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./jwtService")
const { JsonWebTokenError } = require("jsonwebtoken")

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const{ name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already in use',
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            console.log('hash', hash)
            const createdUser = await User.create({
                name, 
                email, 
                password: hash, 
                phone
            })
            if(createdUser){
                resolve({
                    status: 'OK',
                    message: 'Successfully',
                    data: createdUser
                })
            }
        }catch(e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const{ email, password } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'Tài khoản không tồn tại',
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            //console.log('comparePassword', comparePassword)
                if(!comparePassword)
                {
                    resolve({
                        status: 'ERR',
                        message: 'Mật khẩu hoặc tài khoản không đúng',
                    })
                }
                const access_token = await generalAccessToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })

                const refresh_token = await generalRefreshToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })
                resolve({
                    status: 'OK',
                    message: 'Successfully',
                    access_token,
                    refresh_token
                })
        }catch(e) {
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            })
            if(checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'Tài khoản không tồn tại',
                })
            }

            const updateUser = await User.findByIdAndUpdate(id, data, { new: true})
            console.log('updateUser', updateUser)
                resolve({
                    status: 'OK',
                    message: 'Successfully',
                    data: updateUser
                })
        }catch(e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            })
            if(checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'Tài khoản không tồn tại',
                })
            }

            await User.findByIdAndDelete(id)
                resolve({
                    status: 'OK',
                    message: 'Delete user successfully',
                })
        }catch(e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
                resolve({
                    status: 'OK',
                    message: 'Successfully',
                    data: allUser
                })
        }catch(e) {
            reject(e)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id,
            })
            console.log('user', user);
            if(user === null) {
                resolve({
                    status: 'OK',
                    message: 'Tài khoản không tồn tại',
                })
            }
                resolve({
                    status: 'OK',
                    message: 'Successfully',
                    data: user
                })
        }catch(e) {
            reject(e)
        }
    })
}

const deleteAllUser = (userIds) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteAllUser({_id: userIds})
                resolve({
                    status: 'OK',
                    message: 'Delete user successfully',
                })
        }catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    deleteAllUser
}