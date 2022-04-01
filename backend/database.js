// import `MongoClient`
const { MongoClient } = require('mongodb')
var haiku_gen = require('haiku-random');

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
  const insertUrl = async (item) => {

    const collection = db.collection('url')
    let haikuPass = true;

    //TODO: CALL HAIKU GENERATION FUNCTION

    function safeHaiku() {
      return new Promise(resolve => {

        let flag = true;
        let haiku = "";
        let haiku_ran = haiku_gen.random();
        haiku_ran.forEach((h) => {
          haiku += h;
          haiku += '\'
        })

        haiku = haiku.replace(/\s/g , "-");

        getHaiku(haiku)
        .then((h) => {
          //duplicate haiku found;
          flag = false;
          safeHaiku();
        })

        if(flag){
          resolve(haiku);
        }

      });
    }


    //Set id to be the haiku
    item.haiku = await safeHaiku();
    item.traffic = 0;

    console.log(item)

    return collection.insertOne(item)
  }

  // get all items from the "items" collection
  const getItems = () => {
    const collection = db.collection('url')
    return collection.find({}).toArray()
  }

  //Get a Haiku from the database
  //Requires the haiku in correct format
  const getHaiku = (haiku) => {
    const collection = db.collection('url')
    return collection.find({haiku: haiku}).toArray()
  }

  // take the haiku as argument - increase traffic counter
  const updateTraffic = (haiku, traffic) => {
    const collection = db.collection('url')
    return collection.updateOne({ haiku: haiku }, { $inc: { traffic } })
  }


module.exports = { init, insertUrl, getItems, getHaiku, updateTraffic}
