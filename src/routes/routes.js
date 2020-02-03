const router = require('express').Router();

const bearer = require('../authmiddleware/bearer');



const basic = require('../authmiddleware/basic');
const User = require('../model/user');
const Role = require('../model/role');

const capabilities = {
  admin: ['create','read','update','delete', 'superuser'],
  user: ['read'],
};

router.post('/signup', (req, res) => {
  let user = new User(req.body);
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


module.exports = router;
