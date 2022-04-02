/**
 * Validates the shape of the request body
 * @module backend/validations/urlValidations
 */
const Joi = require('joi');

/**
 * Joi validater that checks if the request body is a json objecting containing a url string
 */
const urlSchema = Joi.object().keys({
  url: Joi.string().domain({ tlds: false }),
});

module.exports = { urlSchema };
