/**
 * Handles the routes
 * @module backend/routes/urlRouter
 */
const express = require('express');
const { saveUrl, getTraffic, haikurlRedirect } = require('../controllers/urlController');

const router = express.Router();

router.post('/url', saveUrl);
router.get('/:haiku/traffic', getTraffic);
router.get('/:haiku', haikurlRedirect);

module.exports = router;
