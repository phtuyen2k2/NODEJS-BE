const UserService = require('../services/UserService')
const jwtService = require('../services/jwtService')

const createUser = async (req, res) => {
    try {
        const{ email, password, confirmPassword} = req.body
        const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isCheckEmail = reg.test(email)
        if( !email || !password || !confirmPassword ){
            return res.status(200).json({ 
                status: 'ERR',
                message: 'Vui lòng nhập đầy đủ thông tin'
            })
        }else if(!isCheckEmail)
        {
            return res.status(200).json({ 
                status: 'ERR',
                message: 'Email nhập vào hợp lệ'
            })
        }else if(password !== confirmPassword)
        {
            return res.status(200).json({ 
                status: 'ERR',
                message: 'Password không trùng khớp'
            })
        }
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const{ email, password } = req.body
        const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isCheckEmail = reg.test(email)
        if( !email || !password){
            return res.status(200).json({ 
                status: 'ERR',
                message: 'Vui lòng nhập đầy đủ thông tin'
            })
        }else if(!isCheckEmail)
        {
            return res.status(200).json({ 
                status: 'ERR',
                message: 'Email nhập vào hợp lệ'
            })
        }
        const response = await UserService.loginUser(req.body)
        const { refresh_token, ...newReponse } = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            //path: '/',
        })
        return res.status(200).json({...newReponse, refresh_token})
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if(!userId)
        {
            return res.status(200).json({ 
                status: 'ERR',
                message: 'UserId is required'
            })
        }
        console.log('userId', userId)
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId)
        {
            return res.status(200).json({ 
                status: 'ERR',
                message: 'UserId is required'
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId)
        {
            return res.status(200).json({ 
                status: 'ERR',
                message: 'UserId is required'
            })
        }
        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async (req, res) => {
    console.log('req.cookies.refresh_token', req.cookies.refresh_token);
     try {
        const token = req.cookies.refresh_token
        if(!token)
        {
            return res.status(200).json({ 
                status: 'ERR',
                message: 'Token is required'
            })
        }
        const response = await jwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully'
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteAllUser = async (req, res) => {
    try {
        const userIds = req.body
        if(!userIds)
        {
            return res.status(200).json({ 
                status: 'ERR',
                message: 'UserIds is required'
            })
        }
        const response = await UserService.deleteAllUser(userIds)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser,
    deleteAllUser
}