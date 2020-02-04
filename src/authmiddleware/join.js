// 'use strict';

// require('dotenv').config()
// const User = require('../model/user');
// const jwt = require('jsonwebtoken')


// module.exports = (req, res, next) => {
//   if(!req.headers.authorization){
//     next('Invalid User');
//     return;
//   }

//   let token = req.headers.authorization.split(' ').pop();

//   console.log(token);

//   jwt.verify(token, process.env.SECRET);
// };