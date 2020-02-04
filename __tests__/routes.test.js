'use strict';

const server = require('../src/app').server;
const supergoose = require('./supergoose.js');
const mockRequest = supergoose.server(server);


beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

//__________________ JOB ROUTES TESTING ______________________
describe('Jobs route API testing', () => {
xit('can post() a new job', () => {
    let obj = { name: 'Gardening', price: 50 };
    return mockRequest.post('/jobs')
      .send(obj)
      .then(results => {
        Object.keys(obj).forEach(key => {
          expect(results.body[key]).toEqual(obj[key]);
        });
      });
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
      .expect(200);
  });
  

  xit('can update() a job', () => {
    let obj =  {name: 'Gardening', price: 50, jobType: 'labor' };
    let updateObj = {name: 'Weeding', price: 55, category: 'labor'};
    return mockRequest
      .post('/jobs')
      .send(obj)
      .then(data => {
        return mockRequest
          .put(`/jobs/${data.body._id}`)
          .send(updateObj)
          .then(result => {            
            expect(result.body.name).toBe('Weeding');
          });          
      });
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
