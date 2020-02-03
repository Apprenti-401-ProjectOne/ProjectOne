const router = require('express').Router();

const bearer = require('../authmiddleware/bearer');
const basic = require('../authmiddleware/basic')
const user = require('../model/user');


router.post('/signup', (req, res) => {
  user.save(req.body)
  .then(results => {
    res.status(200);
    res.send('User Created');    
  });


});

router.post('/signin', basic, (req, res) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});


