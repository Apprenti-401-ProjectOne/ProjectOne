'use strict';

const User = require('../model/user');

module.exports = (req, res, next) => {
  if(!req.headers.authorization){
    next('Invalid Login');
    return;
  }

  let token = req.headers.authorization.split(' ').pop();

  User.authenicateToken(token)
  .then(validUser => {
    req.user = validUser;
    next();
  })
  .catch(err => {
    console.log(err);
    next('Invalid Login');
  });
}