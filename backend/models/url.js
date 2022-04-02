/**
 * MongoDB schema for the Url object
 * @module backend/models/url
 */
const mongoose = require('mongoose');

/**
 * Describes the shape of the Url model
 * @typedef urlSchema
 * @prop {string} url - Url provided by the user
 * @prop {string} haiku - Haiku associated with the url
 * @prop {number} traffic - Amount of times the haikurl has been accessed
 * @prop {Date} createdAt - Date the haiku has been created
 */
const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  haiku: {
    type: String,
    required: true,
  },
  traffic: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Url', urlSchema);
