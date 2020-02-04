// 'use strict';

// require('dotenv').config();
// const nodemailer = require('nodemailer');

// // Define our nodemailer transporter to connect to our service
// const transport = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL || 'abc@gmail.com',
//     pass: process.env.PASSWORD || '1234',
//   },
// });
// // Define a mailOptions variable, containing information that your receiver should know about it.
// module.exports = function sendEmail(to, subject, message) {
//   const mailOptions = {
//     from: 'abc@gmail.com',
//     to,
//     subject: 'A message from CañU',
//     text: 'A new job has posted.',
//   };
//   // Invoke the sendMail function.
//   transport.sendMail(mailOptions, (error) => {
//     if (error) {
//       return console.log('An email error has occurred');
//     }
//     return console.log('Email sent!');
//   });
// };

