'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('./role');

const capabilities = {
  admin: ['create','read','update','delete', 'superuser'],
  user: ['read'],
};

const userSchema = new mongoose.Schema({
  username: {type: String, required:true, unique:true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  role: {type: String, default:'user', enum: ['admin','editor','user']},
  jobs: {type: Array},
});

userSchema.virtual('userRoles', {
  ref: 'roles',
  localField: 'role',
  foreignField: 'type',
  justOne: true,
});

userSchema.pre('findOne', async function(){
  try{
    this.populate('userRoles');
  }
  catch(error){
    console.error('find error', error);
  }
});

/**
 * Schema hashes the user's password with salt(10) before saving to the database
 */
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, function(err,hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

/**
 * Generates and signs token with associated user information
 * @returns Signed token that expires in 15 minutes
 */
userSchema.methods.generateToken = function(type) {

  let token = {
    id: this._id,
    username: this.username,
    email: this.email,
    capabilities: capabilities[this.role],
  };

  return jwt.sign(token, process.env.SECRET, {expiresIn: '15min'});
};

/**
 * Authenticates and compares signing in user password to database password
 */
userSchema.statics.authenticateBasic = function(auth) {
  let query = { username: auth.username };
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch(error => {
      console.log(error);
    });
};

userSchema.statics.authenticateToken = function(token) {
  try {
    let parsedTokenObject = jwt.verify(token, process.env.SECRET);
    let query = { _id: parsedTokenObject.id };
    return this.find(query);
  } catch (error) {
    return Promise.reject(error);
  }
};

/** 
 * takes Oauth user info and checks for existing user, if none exists creates a new one
 * @param oauthUser
 * @returns user
*/
userSchema.statics.createFromOauth = function(oauthUser){
  if(!oauthUser){return Promise.reject('Validation Error');}
  return this.findOne({ username: `${oauthUser.email}` })
    .then(user => {
      if(!user){ throw new Error('User not found'); }
      console.log('Welcome Back', user.username);
      return user;
    })
    .catch(error => {
      console.log('Creating new user from oauth');
      let username = oauthUser.email;
      let password = 'oauthpassword';
      let email = oauthUser.email;
      return this.create({username, password, email});
    });
};

userSchema.methods.comparePassword = function(password) {
  return bcrypt
    .compare(password, this.password)
    .then(valid => (valid ? this : null));
};

userSchema.statics.destroyUser = function(username){
  return this.findOneAndDelete({username: username})
    .then(result => {
      if(!result) return 'No User';
      return result;
    }).catch(err => console.log(err));    
};





module.exports = mongoose.model('users', userSchema);