/* eslint-disable no-unused-vars */
'use strict';

process.env.SECRET='secret';

const jwt = require('jsonwebtoken');

const server = require('../src/app').server;
const supergoose = require('./supergoose');

const mockRequest = supergoose.server(server);

let users = {
  admin: {username: 'admin', password: 'password', email: 'testing@test.com', role: 'admin'},
  user: {username: 'user', password: 'password', email: 'testing@test.com', role: 'user'},
};

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Auth Router', () => {

  Object.keys(users).forEach( userType => {

    describe(`${userType} users`, () => {

      let id;
      let token;
      let resultsToken;

      it('Can create user', () => {
        return mockRequest.post('/signup')
          .send(users[userType])
          .then(results => {
            resultsToken = results.text;
            token = jwt.verify(results.text, process.env.SECRET);
            id = token.id;
            expect(token.id).toEqual(id);
          });
      });

      it('Can authenticate user on signin', () => {
        return mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password)
          .then(results => {
            var token = jwt.verify(results.text, process.env.SECRET);
            expect(token.id).toEqual(id);
          });
      });
    });
  });

  // it('/users returns all users', () => {
  //   return mockRequest.get('/users')
  //     .then(data => {
  //       expect(data.body.count).toEqual(2);
  //     });
  // });

  it('Returns invalid login when wrong header', () => {
    return mockRequest.post('/signin')
      .auth({name: 5, password: 6})
      .then(results => {
        expect(results.status).toEqual(500);
      });
  });


});