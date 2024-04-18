const Product = require("../models/ProductModel")

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const{ name, imgae, type, price, countInStock, rating, description } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: 'Tên của sản phẩm đã có',
                })
            }
            const newProduct = await Product.create({
                name, 
                imgae, 
                type, 
                price, 
                countInStock, 
                rating, 
                description,
            })
            if(newProduct){
                resolve({
                    status: 'OK',
                    message: 'Successfully',
                    data: newProduct
                })
            }
        }catch(e) {
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            })
            if(checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'Sản phẩm không tồn tại',
                })
            }

            const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true})
                resolve({
                    status: 'OK',
                    message: 'Successfully',
                    data: updateProduct
                })
        }catch(e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            })
            if(checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'Sản phẩm không tồn tại',
                })
            }

            await Product.findByIdAndDelete(id)
                resolve({
                    status: 'OK',
                    message: 'Xóa sản phẩm thành công',
                })
        }catch(e) {
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id,
            })
            if(product === null) {
                resolve({
                    status: 'OK',
                    message: 'Sản phẩm không tồn tại',
                })
            }
                resolve({
                    status: 'OK',
                    message: 'Successfully',
                    data: product
                })
        }catch(e) {
            reject(e)
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            let allProduct = []
            if(filter){ 
                const label = filter[0];
                const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'Successfully',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if(sort){
                const objectSort = {}
                objectSort[sort[1]] = sort[0] 
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'Successfully',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if(!limit) {
                allProduct = await Product.find()
            }else {
                allProduct = await Product.find().limit(limit).skip(page * limit)
            }
            resolve({
                status: 'OK',
                message: 'Successfully',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        }catch(e) {
            reject(e)
        }
    })
}

const deleteAllProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Xóa sản phẩm thành công',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllTypeProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
                resolve({
                    status: 'OK',
                    message: 'Successfully',
                    data: allType,
                })
        }catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteAllProduct,
    getAllTypeProduct
}