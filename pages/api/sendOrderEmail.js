const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.NEXT_SENDGRID_API_KEY)
const SENDGRID_SENDER = process.env.NEXT_SENDGRID_SENDER
import { ObjectId } from 'mongodb'

const {
  connectToDatabaseUsingCache,
  findNotDeleted
} = require('../../services/db')
let db = null

export default async (req, res) => {
  db = await connectToDatabaseUsingCache(process.env.NEXT_MONGODB_URI, db)
  const {
    query: { orderId = '' }
  } = req
  console.log('orderId', orderId)
  const order = await db
    .collection('orders')
    .findOne({ _id: ObjectId(orderId) })
  // Send email of Terms and Conditions to user
  // get email template
  let { emailTemplate, emailSubject } = await db
    .collection('tech_configs')
    .findOne(findNotDeleted({key: 'email'}))
  emailTemplate = emailTemplate
    .replace('{pickupName}', order.pickupName)
    .replace('{orderNumber}', `#${order.orderNumber}`)
    .replace('{link}', `<a href=${order.successUrl}>here</a>`)
  const msg = {
    to: order.email,
    from: SENDGRID_SENDER,
    subject: emailSubject || '',
    text: emailTemplate || '',
    html: emailTemplate || ''
  }
  if (order.emailSend !== true) {
    try {
      await sgMail.send(msg)
      console.log(`Email send to ${order.email}`)
    } catch (error) {
      console.error(error)
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }
  await db
    .collection('orders')
    .updateOne({ _id: ObjectId(orderId) }, { $set: { emailSend: true } })
  res.status(200).json({ orderId })
}
