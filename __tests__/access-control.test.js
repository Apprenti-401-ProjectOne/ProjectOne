// 'use strict';

// process.env.SECRET='test';

// const supergoose = require('./supergoose');
// const acl = require('../src/authmiddleware/basic');
// const basic = require('../src/authmiddleware/basic');
// const bearer = require('../src/authmiddleware/bearer');
// const User = require('../src/model/user');
// const Roles = require('../src/model/role');
// const express = require('express');
// const app = express();
// const mockRequest = supergoose.server(app);

// let users = {
//   admin: {username: 'admin', password: 'password', email: 'admin@admin.com', role: 'admin'},
//   user: {
//     username: 'user',
//     password: 'password', 
//     email: 'user@user.com', 
//     role: 'user',
//   },
// };

// let roles = {
//   admin: {type: 'admin', capabilities: ['create','read','update','delete', 'superuser']},
//   user: {type: 'user', capabilities: ['read']},
// };

// app.post('/signin', basic, (req, res, next) => {
//   Roles.find({})
//     .then(results => {
//       console.log(results);
//     });
//   console.log(req.user);
//   res.send(req.user);
// });

// app.get('/test', bearer, (req, res, next) => {
//   res.send(req.user);
// });

// beforeAll(async (done) => {
//   await supergoose.startDB();
//   const adminRole = await new Roles(roles.admin).save();
//   const userRole = await new Roles(roles.user).save();
//   const adminUser = await new User(users.admin).save();
//   const userUser = await new User(users.user).save();
//   done();
// });

// afterAll(supergoose.stopDB);

// describe('access control middleware', () => {

//   // admin:password: YWRtaW46cGFzc3dvcmQ=
//   // admin:foo: YWRtaW46Zm9v
//   xit('should not allow a user to hit a route without the proper privelages', async () => {

//     return mockRequest.post('/signin')
//       .auth(users.user.username, users.user.password)
//       .then((results) => {
//         // console.log(results);
//       });

//   });
// });