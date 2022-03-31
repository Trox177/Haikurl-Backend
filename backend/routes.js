//Uses JOI library for setting up shcema/Express for routes
const express = require('express')
const Joi = require('joi')

//Import Database Functions
const { init, insertUrl, getItems, getHaiku, updateTraffic } = require('./database')

// Initialize a new router instance
const router = express.Router()

// Define the schema for the Haiku URL Storage
/*

//DATABASE SCHEMA
{
  id: integer,
  url: string,
  haiku: string,
  traffic: integer > 0
}

//REQUEST VALIDATION SCHEMA
{
url: string.domain()
}

*/

const itemSchema = Joi.object().keys({
  url: Joi.string().domain()
})

/*
Post request route to validate and add url to database
*/
router.post('/url', (req, res) => {

  //Recieve item from body
  const item = req.body

  //Validate that the post request contains a single valid url
  const result = itemSchema.validate(item)
  if (result.error) {
    //If validation fails - send 400 status - log error
    console.log(result.error)
    res.status(400).end()
    return
  }

  //After validation passess - pass url to insertUrl function
  insertUrl(item)
    .then(() => {
      //If insertion passess - send 200 status
      res.status(200).end()
    })
    .catch((err) => {
      // If insertion fails - send 500 status
      console.log(err)
      res.status(500).end()
    })
})

//Returns the traffic of a specific haiku as JSON
router.get('/:haiku/traffic', (req, res) => {
  // `getHaiku` retrieves the haiku from the database
  getHaiku()
    .then((haiku) => {

      //TODO - MINIMIZE OBJECT TO JUST TRAFFIC INTEGER

      // Respond with the haiku object as json
      res.json(haiku)
    })
    .catch((err) => {
      // If retrieval fails - send 500 status
      console.log(err)
      res.status(500).end()
    })
})

//Redirects the user to the original URL
router.get('/:haiku', (req, res) => {
  // `getHaiku` retrieves the haiku from the database
  getHaiku()
    .then((haiku) => {

      //TODO - MINIMIZE HAIKU OBJECT TO ORIGINAL URL
      //TODO - Update the Traffic Counter

      // Send the response url as a json
      res.json(items)
    })
    .catch((err) => {
      // If retrieval fails - send 500 status
      console.log(err)
      res.status(500).end()
    })
})

module.exports = router
