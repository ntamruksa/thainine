import { ObjectId } from 'mongodb'

const { connectToDatabaseUsingCache } = require('../../services/db')

let db = null

export default async (req, res) => {
  db = await connectToDatabaseUsingCache(process.env.NEXT_MONGODB_URI, db)
  const {
    query: { orderId = '' }
  } = req
  console.log('orderId', orderId)
  const order = await db.collection('orders').findOne({_id: ObjectId(orderId)})
  res.status(200).json(order)
}
