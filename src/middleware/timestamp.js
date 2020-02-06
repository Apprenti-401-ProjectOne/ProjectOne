'use strict';

/** 
 * timestamp middleware function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @module timestamp
*/
module.exports = (request, response, next) => {
  console.log(new Date());
  next();
};