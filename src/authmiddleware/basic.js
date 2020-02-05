'use strict';

const User = require('../model/user');

/** 
 * authenticates a user using basic authentication
 * @module basicAuth
*/
module.exports = (req, res, next) => {

  try {
    let [authType, authString] = req.headers.authorization.split(/\s+/);
    
    switch (authType.toLowerCase()) {
    case 'basic':
      return _authBasic(authString);
    default:
      return _authError();
    }
  } catch (e) {
    next(e);
  }
  
  /**
   * takes in a string and pulls out the username and password before sending it through the User.authenticateBasic function
   * @param  str 
   * @return promise
   */
  function _authBasic(str) {
    
    let base64Buffer = Buffer.from(str, 'base64');
    let bufferString = base64Buffer.toString(); 
    let [username, password] = bufferString.split(':'); 
    let auth = { username, password };
    console.log(auth);
    return User.authenticateBasic(auth)
      .then(user => _authenticate(user))
      .catch(next);
  }

  /**
   * takes in a user and assigns it the req.user and assigns req.token to a generated token
   * @param {*} user 
   */
  function _authenticate(user) {
    if (user) {
      req.user = user;
      req.token = user.generateToken();
      next();
    } else {
      _authError();
    }

  /**
   * sends invalid user id/password through next 
   */
  function _authError() {
    next('Invalid User ID/Password');
  }
}; 




