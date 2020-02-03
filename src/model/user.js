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


module.exports = mongoose.model('users', userSchema);