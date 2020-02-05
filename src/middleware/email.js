'use strict';

require('dotenv').config();
const nodemailer = require('nodemailer');

// Define our nodemailer transporter to connect to our service
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * sends an email to a user when a job has been updated
 * @param {*} user
 * @param {*} job
 */
const sendUpdate = (user, job) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'A message from CañU',
    text: updateEmail(user.username, job.name),
  };

  transport.sendMail(mailOptions, (info, error) => {
    if (error) return console.log(error);
    return console.log('Email sent!');
  });
};

/**
 * sends an email to a user when they have successfully posted a job
 * @param {*} user
 * @param {*} job
 */
const sendNewJob = (user, job) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Your CañU job has posted.',
    text: newJob(user.username, job),
  };

  console.log(mailOptions.text);

  transport.sendMail(mailOptions, (error) => {
    if (error) return console.log(error);
    return console.log('Email sent!');
  });
};

/**
 * sends an email to a user when they have successfully signed up
 * @param {*} user
 */
const sendWelcome = user => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Welcome to CañU!',
    text: welcome(user),
  };

  transport.sendMail(mailOptions, (error) => {
    if (error) return console.log(error);
    return console.log('Email sent!');
  });
};


const updateEmail = (username, job) => {
  return `Hello, ${username}, you've been outbid on ${job}. The new highest bid is ${job.price}.`;
};

const newJob = (username, job) => {
  return `Hello, ${username}, this is confirmation of your job: ${job}.`;
};

const welcome = username => {
  return `Welcome to CañU, ${username}!`;
};

/** 
 * module containing automated email functionality
 * @module emailModule
*/
module.exports = { sendUpdate, sendNewJob, sendWelcome };

