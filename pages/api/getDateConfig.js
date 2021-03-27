const { connectToDatabaseUsingCache, findNotDeleted } = require('../../services/db')

let db = null

export default async (req, res) => {
  db = await connectToDatabaseUsingCache(process.env.NEXT_MONGODB_URI, db)
  const {
    query: { date }
  } = req
  const closedDateConfig = await db.collection('closed_date_config').findOne(findNotDeleted({date}))
  res.status(200).json(closedDateConfig)
}
