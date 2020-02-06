'use strict';

const User = require('../model/user');

/** 
 * authenticates a user using bearer authorization
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @module bearerAuth
*/
module.exports = (req, res, next) => {
  
  if(!req.headers.authorization){
    next('Invalid Login');

    return;
  }

  let token = req.headers.authorization.split(' ').pop(); 
  
  User.authenticateToken(token)
    .then(validUser => {
      req.user = validUser;
      next();
    })
    .catch(err => {
      console.log(err);
      next('Invalid Login');
    });
};