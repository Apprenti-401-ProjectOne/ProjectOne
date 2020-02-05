'use strict';

const server = require('../src/app').server;
const supergoose = require('./supergoose.js');
const mockRequest = supergoose.server(server);
const Job = require('../src/model/job');
const User = require('../src/model/user');
const {jobPost} = require('../src/routes/jobRoutes');

const jobs = {
  gardening: {name: 'Gardening', description: 'Mowing my lawn', price: 50, jobType: 'Manual Labor'},
  roofing : {name: 'Roofing', description: 'Cleaning off the roof', price: 20, jobType: 'Manual Labor'}
};

let users = {
  admin: {username: 'admin', password: 'password', email: 'admin@admin.com', role: 'admin'}
};


beforeAll(async (done) => {
  await supergoose.startDB();
  const adminUser = await new User(users.admin).save();
  const gardeningJob = await new Job(jobs.gardening).save();
  const roofingJob = await new Job(jobs.roofing).save();
  done();
});
afterAll(supergoose.stopDB);

//__________________ JOB ROUTES TESTING ______________________
describe('Jobs route API testing', () => {

  let token = User.generateToken(users.admin)
  xit('Returns error 500 when sent invalid object', () => {
    console.log(token)
    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    let res = {};
    let next = jest.fn();

    // let obj = {username: 'test'};
    return jobPost(req, res, next)
      .then(result => console.log(result))
  });

  it('Returns 0 when no jobs posted in database', () => {
    return mockRequest
      .get('/jobs')
      .then(data => {        
        expect(data.body.count).toEqual(0);
      });
  });

  it('can get() ONE job', () => {
    return mockRequest.get('/jobs')
      .expect(200)
      .then(results => {
        expect(results.body).toBeDefined();
      });
  });
  

  xit('can update() a job', () => {
    const req = {};
    let res = {};
    let next = jest.fn();

    return jobUpdate(req, res, next)
      .then(results => console.log(results))

  });
  
  xit('can delete a job', () => {
    const obj = { name: 'Gardening', price: 50, jobType: 'labor'  };
    return mockRequest.post('/jobs')
      .send(obj)
      .then (results => {
        return mockRequest.delete(`/jobs/${results.body._id}`)
          .then(data => {
            return mockRequest.get('/jobs')
              .then(data => {
                Object.keys(obj).forEach(key => {
                  expect(data.body[key]).not.toEqual(obj[key]);
                });
              });
          });
      });
  });
});

describe('OAuth Routes', () => {

  it('Github OAuth Route', () => {
    return mockRequest.get('/ghoauth')
      .expect(200);
  });

  it('Google OAuth Route', () => {
    return mockRequest.get('/ggoauth')
      .expect(200);
  });
});

describe('General Routing', () => {

  it('Roles Route functioning', () => {
    return mockRequest.post('/roles')
      .expect(200)
      .then(result => {
        expect(result.text).toBe('Roles Created');
      });
  });
});

