/**
 * Business logic used by the urlController
 * @module backend/services/urlServices
 */
const Url = require('../models/url');
const haiku_gen = require('haiku-random');

/**
 * Creates a random haiku
 * @returns {string} - Returns a haiku string
 */
const _createHaiku = () => {
  let haiku = '';
  let haiku_ran = haiku_gen.random();
  haiku_ran.forEach((h) => {
    haiku += h;
    haiku += '|||';
  });

  haiku = haiku.replace(/\s/g, '-');
  return haiku;
};

/**
 * Creates a random haiku and saves to the database if it is unique
 * @throws {error} - Throws mongodb related errors or if it fails to generate a unique haiku after 100 attempts
 * @returns {String} - Returns the generated haiku
 */
const createUniqueHaiku = async (url) => {
  let haiku = _createHaiku();
  let haikuExists = await getUrlByHaiku(haiku);
  let counter = 0;
  // If the haiku exists in the database, keep creating haikus until we find a unique one
  while (haikuExists) {
    // Base case to prevent infinite looping
    if (counter === 100) throw { message: 'Server error' };
    //Generate a Haiku
    haiku = _createHaiku();
    //Check to see if the newly generated Haiku is used
    haikuExists = await getUrlByHaiku(haiku);
    counter++;
  }

  //Once we have a unique Haiku
  return haiku;
};

/**
 * Creates an entry in database with URL object
 * @throws {error} - Throws mongodb related errors or if it fails to create DB document
 * @returns {Object} - Returns mongoDB response
 */
const generateNewEntry = async (url, haiku) => {
  const newUrlObj = new Url({
    url,
    haiku,
  });

  const savedUrlObj = await newUrlObj.save();
  return savedUrlObj;
};

const getUrlByHaiku = (haiku) => Url.findOne({ haiku });

module.exports = { createUniqueHaiku, generateNewEntry, getUrlByHaiku };
