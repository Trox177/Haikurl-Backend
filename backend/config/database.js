/**
 * Initializes MongoDB
 * @module backend/config/database
 */
const mongoose = require('mongoose');
const config = require('config');

const dbConfig = config.get('database');

/**
 * Init Function for MongoDB Database
 * @param {string} - The host url to connect to
 * @param {Object} param - Mongodb options
 * @param {boolean} param.useNewUrlParser - Uses new url parser based on boolean value
 */
mongoose.connect(dbConfig.host, { useNewUrlParser: true });
const db = mongoose.connection;

module.exports = db;
