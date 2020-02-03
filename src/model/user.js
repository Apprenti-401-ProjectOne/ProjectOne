'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
  jobs: {type: mongoose.Schema.Types.ObjectId, ref: 'jobs'},
});

userSchema.virtual('userRoles', {
  ref: 'roles',
  localField: 'role',
  foreignField: 'type',
  justOne: true,
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


userSchema.methods.comparePassword = function(password) {
  return bcrypt
    .compare(password, this.password)
    .then(valid => (valid ? this : null));
};


module.exports = mongoose.model('users', userSchema);