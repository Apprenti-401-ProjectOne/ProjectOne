'use strict';

/**
 * logger middleware to log the method, path, and request time
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @module logger
 */
module.exports = (request, response, next) => {
  console.log(request.method, request.path, request.requestTime);
  next();
};