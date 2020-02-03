'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = 'SECRET';

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


userSchema.pre('save', async (next) => {
  if (this.isModified('password')) {
    this.password = await bycrpt.hash(this.password, 10);
  }
});


userSchema.methods.generateToken = function(type) {

  let token = {
    id: this._id,
    username: this.username,
    email: this.email,
    capabilities: capabilities[this.role],
  };

  return jwt.sign(token, SECRET, {expiresIn: '15min'});
};
