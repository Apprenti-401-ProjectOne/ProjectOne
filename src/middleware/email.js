'use strict';

require('dotenv').config();

const nodemailer = require('nodemailer');
const log = console.log;

// Define our nodemailer transporter to connect to our service
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL || 'abc@gmail.com',
    pass: process.env.PASSWORD || '1234',
  },
});

// Define a mailOptions variable, containing information that your receiver should know about it.
let mailOptions = {
  from: 'abc@gmail.com',
  to: 'abc@gmail.com',
  subject: 'A message from CañU',
  text: 'A new job has posted.',
};

// Invoke the sendMail function.
transporter.sendMail(mailOptions, (error, data) => {
  if (error) {
    return log('An email error has occurred');
  }
  return log('Email sent!');
});


