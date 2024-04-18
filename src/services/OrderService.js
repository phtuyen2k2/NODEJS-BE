const Order = require("../models/OrderProduct")
const EmailService = require("../services/EmailService")

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice,  totalPrice, fullName, address, phone, user, email  } = newOrder
        try {
            const createdOrder = await Order.create({
                orderItems,
                shippingAddress: {
                  fullName,
                  address,
                    phone
                },
                paymentMethod,
                itemsPrice,
                totalPrice,
                user: user,
            })
            await EmailService.sendEmailCreateOrder(email,orderItems)
            if (createdOrder) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdOrder
                })
            }
        } catch (e) {
          console.log('e', e)
            reject(e)
        }
    })
}

module.exports = {
    createOrder,
}