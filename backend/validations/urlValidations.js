/**
 * Validates the shape of the request body
 * @module backend/validations/urlValidations
 */
const Joi = require('joi');

/**
 * Joi validater that checks if the request body is a json objecting containing a url string
 */
const urlSchema = Joi.object().keys({
  url: Joi.string().pattern(new RegExp("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"))
});

module.exports = { urlSchema };
