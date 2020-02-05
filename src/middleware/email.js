'use strict';

require('dotenv').config();
const nodemailer = require('nodemailer');

// Define our nodemailer transporter to connect to our service
const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
// Define a mailOptions variable, containing information that your receiver should know about it.s

const sendUpdate = (user, job) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'We hate you!',
    text: updateEmail(user.username, job.name),
  };

  transport.sendMail(mailOptions, (error) => {
    if (error) return console.log('An email error has occurred');
    return console.log('Email sent!');
  });
};

const updateEmail = (username, job) => {
  return `Hello, ${username}, you've been outbid on ${job}. The new highest bid is ${job.price}.`;
};

const newJob = (username, job) => { 
  return `Hello, ${username}, this is confirmation of your job ${job.name}.`;
};

const welcome = username => `Welcome to CañU, ${username}!`;

module.exports = {sendUpdate};

