'use strict';

/** 
 * error handler for server error 500 errors
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @module errorHandler
*/
module.exports = (err, req, res, next) => {
  let error = { error: err };
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  console.log(error);
  res.write(JSON.stringify(error));
  res.end();
};

