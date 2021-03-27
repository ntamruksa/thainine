const { connectToDatabaseUsingCache, findNotDeleted } = require('../../services/db')
const stripe = require('../../services/stripe')
const moment = require('moment')
let db = null

export default async (req, res) => {
  db = await connectToDatabaseUsingCache(process.env.NEXT_MONGODB_URI, db)
  // 1. get order
  const orderCount = await db.collection('orders_counter')
  const currentCounter = await orderCount.findOneAndUpdate(
    {},
    { $inc: { count: 1 } },
    { returnOriginal: true, new: false }
  )
    // add prefix
    const orderNumber = (currentCounter.value.count % 100) + 1
    const paddedOrderNum = orderNumber < 10 ? '00' + orderNumber : (orderNumber < 100 ? '0' + orderNumber : orderNumber)
  const now = new Date()
  const cart = req.body.cart
  const order = {
    status: 'open',
    createdDate: now,
    // source: cart.token,
    items: cart.items,
    totalInCents: cart.cartTotal,
    surchargeInCents: cart.cartSurcharge,
    subTotalInCents: cart.cartSubTotal,
    email: cart.email,
    pickupName: cart.pickupName,
    pickupTime: cart.pickupTime,
    phone: cart.phone,
    orderNumber: paddedOrderNum,
    paymentMethodId: cart.paymentMethodId,
    address: cart.address,
    option: cart.option,
    deliveryFeeInCents: cart.deliveryFeeInCents,
  }
  // for delivery order, calculate estimate deliver time from createdDate
  const { etaMins } = await db
  .collection('tech_configs')
  .findOne(findNotDeleted({key: 'delivery'}))
  if (etaMins) {
    order.deliveryTime = moment(now).add(etaMins, 'minutes').toDate()
  }
  const { insertedId } = await db.collection('orders').insertOne(order)
  await db
    .collection('orders')
    .updateOne({ _id: insertedId }, { $set: { successUrl: `${process.env.NEXT_CLIENT_BASE_URL}/checkout-success?orderId=${insertedId}` } })
  res.status(200).json({orderId: insertedId})
}
