// import `MongoClient`
const { MongoClient } = require('mongodb')

//Database connection url
const connectionUrl = 'mongodb://localhost:27017'

// Defines the database name as haikurl
const dbName = 'haikurl'

//Variable for the database
let db

//Init Function for MongoDB Database
const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
  })

  /*
  insertUrl FUNCTION

  Takes in item (From Post REQUEST '/url')
  Modifies item to correct DB schema

  //DATABASE SCHEMA
  {
    id: integer,
    url: string,
    haiku: string,
    traffic: integer > 0
  }

  Calls Haiku Generation to add to item object (TO BE IMPLEMENTED)

  @param item: pre-modified object containing user sent url to be stored and converted
  @pre: Post request compeleted recieving url from user
  @post: return result of inserting item into 'url' document
  */
  const insertUrl = (item) => {
    const collection = db.collection('url')

    //TODO: MODIFY ITEM OBJECT
    //TODO: CALL HAIKU GENERATION FUNCTION

    return collection.insertOne(item)
  }

  // get all items from the "items" collection
  const getItems = () => {
    const collection = db.collection('url')
    return collection.find({}).toArray()
  }

  // get all items from the "items" collection
  const getTraffic = (haiku) => {
    const collection = db.collection('url')
    return collection.find({ haiku: haiku })
  }

  // take the id and the quantity to add as arguments, and increase the
  // "quantity" using the `$inc` operator
  const updateQuantity = (id, quantity) => {
    const collection = db.collection('url')
    return collection.updateOne({ _id: ObjectId(id) }, { $inc: { quantity } })
  }


module.exports = { init, insertItem, getItems, updateQuantity }
