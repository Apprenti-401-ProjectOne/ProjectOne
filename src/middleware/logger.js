'use strict';

/**
 * Logger Middleware, takes 3 arguments
 * @param  {} request
 * @param  {} response
 * @param  {} next
 */

module.exports = (request, response, next) => {
  console.log(request.method, request.path, request.requestTime);
  next();
};