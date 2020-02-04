// 'use strict';

// const request = require('supertest');
// const express = require('express');
// const app = express();
// const acl = require('../src/authmiddleware/access-control');

// let user = {
//   username: 'user',
//   userRoles: {
//     capabilities: ['read'],
//   },
// };

// app.post('/signin', (req, res, next) => {
//   res.send('ok');
// });
// app.get('/userroute', (req, res, next) => {
//   user = req.user;
//   res.send(req.user);
// });

// app.get('/adminroute', acl('superuser'), (req, res, next) => {
//   res.send('ok');
// });


// describe('access control middleware', () => {
//   request(app).post('/signin')
//     .send({user: 'user'})
//     .then(results => {
//       console.log(results);
//     });
// });