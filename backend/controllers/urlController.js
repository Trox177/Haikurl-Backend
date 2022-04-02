/**
 * Controller methods that are used by the router
 * @module backend/controllers/urlController
 */
const { urlSchema } = require('../validations/urlValidations');

const { createUniqueHaiku, generateNewEntry, getUrlByHaiku } = require('../services/urlServices');

/**
 * Saves a url to the database and responds with a haiku
 * Calls Haiku Generation to add to item object (TO BE IMPLEMENTED)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const saveUrl = async (req, res, next) => {
  const errorMessage = { message: 'Must provide a valid url', code: 400 };
  try {
    if (req.body === undefined) throw errorMessage;
    console.log(urlSchema.validate(req.body));
    if (urlSchema.validate(req.body).error) throw errorMessage;

    const url = req.body.url;

    //Make Haiku
    const haiku = await createUniqueHaiku(url);
    //Store Haiku
    const { store } = await generateNewEntry(url, haiku);

    res.status(200).json({ haiku });
  } catch (error) {
    next(error);
  }
};

/**
 * Gets the amount of times a haikurl has been accessed
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getTraffic = async (req, res, next) => {
  try {
    const haiku = req.params.haiku;
    const { traffic } = await getUrlByHaiku(haiku);
    res.status(200).json({ traffic });
  } catch (error) {
    next(error);
  }
};

/**
 * Redirects a user to the url that the haiku points to, then increments the url objects traffic
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const haikurlRedirect = async (req, res, next) => {
  try {
    const haiku = req.params.haiku;
    let urlObj = await getUrlByHaiku(haiku);

    if (!urlObj) throw { message: 'Haikurl does not exist', code: 404 };

    urlObj.traffic += 1;
    await urlObj.save();
    res.redirect(301, encodeURI(urlObj.url));
  } catch (error) {
    next(error);
  }
};

module.exports = { saveUrl, getTraffic, haikurlRedirect };
