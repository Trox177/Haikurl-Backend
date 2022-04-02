/**
 * Error handlers
 * @module backend/middleware/errorHandler
 */

/**
 * Logs errors
 * @param {Error} - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorLogger = (error, req, res, next) => {
  console.error(error);
  next(error);
};

/**
 * All errors from the controller are passed here
 * @param {Error} - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorResponder = (error, req, res, next) => {
  if (error.code) {
    res.status(error.code).json({ message: error.message.toString() });
  } else {
    next(error);
  }
};

/**
 * All errors without a status code are passed here
 * @param {Error} - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const failSafeHandler = (error, req, res) => {
  // generic error handler response
  res.status(500).json({ message: 'Server error' });
};

module.exports = { errorLogger, errorResponder, failSafeHandler };
