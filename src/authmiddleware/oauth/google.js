'use strict';

require('dotenv').config();
const superagent = require('superagent');
const User = require('../../model/user');
const email = require('../../middleware/email');

/** 
 * authorizes a user through google oauth
 * @param {Object} req - Express request object
 * @module googleOauth
*/
module.exports = function authorize(req){
  let code = req.query.code;
  console.log('1. CODE: ', code);

  return superagent.post(process.env.GG_TOKEN_SERVER)
    .type('form')
    .send({
      code: code,
      client_id: process.env.GG_CLIENT_ID,
      client_secret: process.env.GG_CLIENT_SECRET,
      redirect_uri: process.env.GG_REDIRECT,
      grant_type:'authorization_code',
    })
    .then(response => {
      let accessToken = response.body.access_token;
      console.log('2. ACCESS TOKEN: ', accessToken);
      return accessToken;
    })
    .then(token => {
      return superagent.get(process.env.GG_API_SERVER)
        .set('Authorization', `Bearer ${token}`)
        .then(response => {
          let user = response.body;
          user.access_token = token;
          console.log('3. GOOGLEUSER', user);
          return user;
        });
    })
    .then(oauthUser => {
      console.log('4. CREATE ACCOUNT FROM OAUTH');
      return User.createFromOauth(oauthUser);
    })
    .then(createdUser => {
      console.log('5. SENDING EMAIL');
      email.sendWelcome(createdUser);
      console.log('6. GENERATING TOKEN..', createdUser);
      return createdUser.generateToken();
    })
    .catch(error => console.error(error));
};