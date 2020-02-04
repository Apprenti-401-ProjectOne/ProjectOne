// 'use strict';


// const {server} = require('../src/app.js');
// const supergoose = require('@code-fellows/supergoose');
// const mockRequest = supergoose(server);
// // const jwt = require('jsonwebtoken');

// //__________________ JOB ROUTES TESTING ______________________
// describe('Jobs route API testing', () => {
//   it('can post() a new job', () => {
//     let obj = { name: 'Gardening', price: 50, jobType: 'labor' };
//     return mockRequest.post('/jobs')
//       .send(obj)
//       .then(results => {
//         Object.keys(obj).forEach(key => {
//           expect(results.body[key]).toEqual(obj[key]);
//         });
//       });
//   });

  // it('can get() a job', () => {
  //   let obj =  {name: 'Gardening', price: 50, jobType: 'labor' };
  //   return mockRequest
  //     .get('/jobs')
  //     .send(obj)
  //     .then(data => {        
  //       expect(data.body.count).toEqual(1);
  //     });
  // });

  // it('can get() ONE job', () => {
  //   return mockRequest.get('/jobs')
  //     .send( {name: 'Gardening', price: 50, jobType: 'labor'} )
  // });
  

  // it('can update() a job', () => {
  //   let obj =  {name: 'Gardening', price: 50, jobType: 'labor' };
  //   let updateObj = {name: 'Weeding', price: 55, category: 'labor'};
  //   return mockRequest
  //     .post('/jobs')
  //     .send(obj)
  //     .then(data => {
  //       return mockRequest
  //         .put(`/jobs/${data.body._id}`)
  //         .send(updateObj)
  //         .then(result => {            
  //           expect(result.body.name).toBe('Weeding');
  //         });          
  //     });
  // });
  
  // it('can delete a job', () => {
  //   const obj = { name: 'Gardening', price: 50, jobType: 'labor'  };
  //   return mockRequest.post('/jobs')
  //     .send(obj)
  //     .then (results => {
  //       return mockRequest.delete(`/jobs/${results.body._id}`)
  //         .then(data => {
  //           return mockRequest.get('/jobs')
  //             .then(data => {
  //               Object.keys(obj).forEach(key => {
  //                 expect(data.body[key]).not.toEqual(obj[key]);
  //               });
  //             });
  //         });
  //     });
  // });
// });