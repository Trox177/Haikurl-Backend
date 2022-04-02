/**
 * Controller methods that are used by the router
 * @module backend/controllers/urlController
 */
const { urlSchema } = require('../validations/urlValidations');

const { createUniqueHaiku, getUrlByHaiku } = require('../services/urlServices');

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
    if (urlSchema.validate(req.body).error) throw errorMessage;

    const { haiku } = await createUniqueHaiku(req.body.url);
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
 * Gets the amount of times a haikurl has been accessed
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
    res.redirect('http://' + urlObj.url);
  } catch (error) {
    next(error);
  }
};

module.exports = { saveUrl, getTraffic, haikurlRedirect };
