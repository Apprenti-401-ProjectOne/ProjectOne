/* eslint-disable no-unused-vars */
'use strict';

process.env.SECRET='test';

const supergoose = require('./supergoose');
const basic = require('../src/authmiddleware/basic');
const User = require('../src/model/user');

let users = {
  admin: {username: 'admin', password: 'password', email: 'admin@admin.com', role: 'admin'},
  user: {username: 'user', password: 'password', email: 'user@user.com', role: 'user'},
};

beforeAll(async (done) => {
  await supergoose.startDB();
  const adminUser = await new User(users.admin).save();
  const userUser = await new User(users.user).save();
  done();
});

afterAll(supergoose.stopDB);

describe('Auth Middleware', () => {

  // admin:password: YWRtaW46cGFzc3dvcmQ=
  // admin:foo: YWRtaW46Zm9v

  let errorObject = 'Invalid User ID/Password';

  it('fails a login for an admin with the incorrect basic credentials', () => {
    let req = {
      headers: {
        authorization: 'Basic YWRtaW46Zm9v',
      },
    };
    let res = {};
    let next = jest.fn();

    return basic(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalledWith(errorObject);
      });
  });
  
  it('logs in an admin with the right credentials', () => {
    let req = {
      headers: {
        authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
      },
    };
    let res = {};
    let next = jest.fn();

    return basic(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalledWith();
      });
  });
});