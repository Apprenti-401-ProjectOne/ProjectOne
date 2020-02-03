'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

const capabilities = {
  admin: ['create','read','update','delete', 'superuser'],
  user: ['read'],
};
