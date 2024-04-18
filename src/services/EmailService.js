const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()
var inlineBase64 = require('nodemailer-plugin-inline-base64');

const sendEmailCreateOrder = async (email, orderItems) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_ACCOUNT, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });
  transporter.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}));

  let listItem = '';
  const attachImage = []
  orderItems.forEach((order) => {
    listItem += `<div>
    <div>
    <div>>>>>Tên sản phẩm: <b>${order.name}</div>
      <div>- Số lượng: <b>${order.amount}</div>
      <div>- Tổng tiền là: <b>${order.price} đ</div>
    </div>`
    attachImage.push({path: order.imgae})
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT, // sender address
    to: process.env.MAIL_ACCOUNT, // list of receivers
    subject: "Đơn hàng đã đặt thành công tại BLONKUTE", // Subject line
    text: "Hello world?", // plain text body
    html: `<div><b>Khách hàng đã đặt hàng thành công tại BLONKUTE</b></div> ${listItem}`,
    attachments: attachImage,
  });
}

module.exports = {
  sendEmailCreateOrder
}