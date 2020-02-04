'use strict';


const {server} = require('../src/app.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
// const jwt = require('jsonwebtoken');

//_________________ SIGN UP/SIGN IN ROUTES ___________________



//__________________ JOB ROUTES TESTING ______________________
describe('Jobs route API testing', () => {
  xit('can post() a new job', () => {
    let obj = { name: 'Gardening', price: 50, jobType: 'labor' };
    return mockRequest.post('/jobs')
      .send(obj)
      .then(results => {
        Object.keys(obj).forEach(key => {
          expect(results.body[key]).toEqual(obj[key]);
        });
      });
  });


  xit('can get() a job', () => {
    let obj =  { 
      name: 'Kitchen organizing', 
      price: 75, 
      jobType: 'Organization', 
    };
    return mockRequest
      .get('/jobs')
      .send(obj)
      .then(data => {        
        expect(data.body.count).toEqual(1);
      });
  });

  xit('can get() ONE job', () => {
    return mockRequest.get('/jobs')
      .send( {name: 'Walk my dogs', price: 20, jobType: 'Dog Walking'} )
      .then(data => {
        expect(data.body.count).toEqual(1);
      });
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

  xit('can get a list of jobs', () => {
    return mockRequest
      .get('/jobs')
      .send()
      .then(data => {
        expect(data.body.count).toEqual(2);
      });
  });

  xit('should return status 500', ()=>{
    return mockRequest
      .post('/jobs')
      .send()
      .then(res => {
        expect(res.status).toBe(500);
      });
  });
});

