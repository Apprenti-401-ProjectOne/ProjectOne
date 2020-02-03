const router = require('express').Router();

const bearer = require('../authmiddleware/bearer');
const User = require('../model/user');


router.post('/signup', (req, res) => {
  console.log(req.body)
  let user = new User(req.body);
  user.save(req.body)
    .then(results => {
      res.status(200);
      res.send('User Created');
    })
    .catch(error => console.error(error))

});

router.post('/signin', (req, res) => {

});

module.exports = router;
