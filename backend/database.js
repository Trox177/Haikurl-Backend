// import the `MongoClient` object from the library
const { MongoClient } = require('mongodb')

// define the connection string. If you're running your DB
// on your laptop, this would most likely be it's address
const connectionUrl = 'mongodb://localhost:27017'

// Define the DB name. We will call ours `store`
const dbName = 'store'

// Create a singleton variable `db`
let db

// The init function retruns a promise, which, once resolved,
// assigns the mongodb connection to the `db` variable
const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
  })

  // these functions are added to the `db.js` file:

  // Take the item as an argument and insert it into the "items" collection
  const insertItem = (item) => {
    const collection = db.collection('items')
    return collection.insertOne(item)
  }

  // get all items from the "items" collection
  const getItems = () => {
    const collection = db.collection('items')
    return collection.find({}).toArray()
  }

  // take the id and the quantity to add as arguments, and increase the
  // "quantity" using the `$inc` operator
  const updateQuantity = (id, quantity) => {
    const collection = db.collection('items')
    return collection.updateOne({ _id: ObjectId(id) }, { $inc: { quantity } })
  }


module.exports = { init, insertItem, getItems, updateQuantity }
