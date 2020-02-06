'use strict';

const router = require('express').Router();
const bearer = require('../authmiddleware/bearer');
const basic = require('../authmiddleware/basic');
const User = require('../model/user');
const Role = require('../model/role');
const acl = require('../authmiddleware/access-control');
const email = require('../middleware/email');

const capabilities = {
  admin: ['create','read','update','delete', 'superuser'],
  user: ['read'],
};

router.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  email.sendWelcome(user);
  user.save()
    .then(results => {
      req.token = user.generateToken();
      res.status(200);
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    })
    .catch(error => console.error(error));
});

router.post('/signin', basic, (req, res) => {
  res.cookie('auth', req.token);
  res.status(200);
  res.send(req.token);
});

router.post('/roles', (req, res, next) => {
  let saved = [];
  Object.keys(capabilities).map(role => {
    let newRecord = new Role({type: role, capabilities: capabilities[role]});
    saved.push(newRecord.save());
  });
  Promise.all(saved);
  res.send('Roles Created');
});

router.get('/users', bearer, acl('superuser'), (req, res, next) => {
  User.find({})
    .then(results => res.json(results))
    .catch(error => console.error(error));
});

router.post('/deleteUser', bearer, acl('superuser'), (req, res) => {
  User.destroyUser(req.body.userName)
    .then(result => {
      res.send(result);
    })
    .catch(error => console.log(error));
});

/** 
 * contains routes for sign in/up, as well as admin specific routes
 * @module routes
*/
module.exports = router;
