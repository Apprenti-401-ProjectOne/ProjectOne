'use strict';

const express = require('express');
const authRouter = express.Router();

const ggOauth = require('../authmiddleware/oauth/google');
const ghOauth = require('../authmiddleware/oauth/github');
const fbOauth = require('../authmiddleware/oauth/facebook');

authRouter.get('/ghoauth', (req, res, next) => {
  ghOauth(req)
    .then(token => {
      res.status(200).send(token);
    })
    .catch(next);
});

authRouter.get('/ggoauth', (req, res, next) => {
  ggOauth(req)
    .then(token => {
      res.status(200).send(token);
    })
    .catch(next);
});

module.exports = authRouter;