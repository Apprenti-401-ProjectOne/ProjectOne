'use strict';

/**
 * logger middleware to log the method, path, and request time
 * @module logger
 */
module.exports = (request, response, next) => {
  console.log(request.method, request.path, request.requestTime);
  next();
};