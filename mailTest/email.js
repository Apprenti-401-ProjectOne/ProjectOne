// 'use strict';
// const express = require('express');
// const app = express();
// const nodemailer = require('nodemailer');


// app.post('/send', function(req, res, next) {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'test-email@gmail.com',
//       pass: 'test123',
//     },
//   });
  
//   const mailOptions = {
//     from: `${req.body.email}`,
//     to: 'test-email@gmail.com',
//     subject: `${req.body.name}`,
//     text: `${req.body.message}`,
//     replyTo: `${req.body.email}`
//   };
//   transporter.sendMail(mailOptions, function(err, res) {
//     if (err) {
//       console.error('there was an error: ', err);
//     } else {
//       console.log('here is the res: ', res);
//     }
//   });
// });
