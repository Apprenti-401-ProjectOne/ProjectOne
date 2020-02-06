/* eslint-disable no-unused-vars */
'use strict';

process.env.SECRET='secret';

const jwt = require('jsonwebtoken');
const User = require('../src/model/user');
const server = require('../src/app').server;
const supergoose = require('./supergoose');

const mockRequest = supergoose.server(server);

let users = {
  admin: {username: 'admin', password: 'password', email: 'testing@test.com', role: 'admin'},
  user: {username: 'user', password: 'password', email: 'testing@test.com', role: 'user'},
};

beforeAll(supergoose.startDB);

afterAll(done => {
  supergoose.stopDB;
  done();
});

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

  it('Returns invalid login when wrong header', () => {
    return mockRequest.post('/signin')
      .auth({name: 5, password: 6})
      .then(results => {
        expect(results.status).toEqual(500);
      });
  });

  it('Returns error without proper admin authorization', () => {
    return mockRequest.get('/users')
      .expect(500)
      .then(result => {
        expect(result.text).toBeDefined();
      });
  });

  it('Returns error without proper admin authorization for deleting user', () => {
    return mockRequest.post('/deleteUser')
      .expect(500)
      .then(result => {
        expect(result.body).toBeDefined();
      });
  });
});


describe('User Methods', () => {
  
  let id;
  let token;
  let resultsToken;
  
  const userObj = {
    username: 'Trevor',
    password: 'Testing token',
    email: 'testing@test.com',
  };

  const userObjTwo = {
    username: 'Trevor5000',
    password: 'Testing token',
    email: 'testing@test.com',
  };

  const userObjThree = {
    username: 'Trevor1000',
    password: 'Testing token',
    email: 'testing@test.com',
  };
  
  it('Generates Token', () => {
    token = new User().generateToken(userObj);
    expect(token).toBeDefined();
  });

  it('Authenticates Token', () => {
    return mockRequest.post('/signup')
      .send(userObjTwo)
      .expect(200)
      .then(async results => {
        let authenticate = await User.authenticateToken(results.text);
        expect(authenticate[0].username).toBe('Trevor5000');
      });
  });

  it('Can destroyUser from database', () => {
    return mockRequest.post('/signup')
      .send(userObj)
      .expect(200)
      .then(async results => {
        resultsToken = results.text;
        token = jwt.verify(results.text, process.env.SECRET);
        id = token.id;
        const deleteUser = await User.destroyUser(token.username);
        expect(deleteUser).toBeDefined();
      });
  });

  it('Returns user from database if found from OAuth', async () => {
    let oauthUser = await User.createFromOauth({username: 'trevor', password: 'password', email: 'email'});
    expect(oauthUser).toBeDefined();
  });
});


