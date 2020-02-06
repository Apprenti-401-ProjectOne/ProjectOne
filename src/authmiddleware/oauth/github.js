'use strict';

require('dotenv').config();
const superagent = require('superagent');
const User = require('../../model/user');
const email = require('../../middleware/email');

/** 
 * authorizes a user through github oauth
 * @param {Object} req - Express request object
 * @module githubOauth
*/
module.exports = function authorize(req){
  let code = req.query.code;
  console.log('1. CODE: ', code);

  return superagent.post(process.env.GH_TOKEN_SERVER)
    .send({
      code: code,
      client_id: process.env.GH_CLIENT_ID,
      client_secret: process.env.GH_CLIENT_SECRET,
      redirect_uri: process.env.GH_REDIRECT,
      grant_type:'authorization_code',
    })
    .then(response => {
      let accessToken = response.body.access_token;
      console.log('2. ACCESS TOKEN: ', accessToken);
      return accessToken;
    })
    .then(token => {
      return superagent
        .get(process.env.GH_API_SERVER)
        .set('Authorization', `Bearer ${token}`)
        .set('User-Agent', '')
        .then(response => {
          let user = response.body;
          user.access_token = token;
          return superagent
            .get('https://api.github.com/user/emails')
            .set('Authorization', `Bearer ${token}`)
            .set('User-Agent', '')
            .then(response => {
              user.email = response.body[0].email;
              console.log('3. GITHUBUSER', user);
              return user;
            });
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