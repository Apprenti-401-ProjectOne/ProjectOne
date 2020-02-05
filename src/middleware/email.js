'use strict';

require('dotenv').config();
const nodemailer = require('nodemailer');


const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendNewJob = (user, job) => {
  const mailOptions = jobOptions(user, job); 
  sendEmail(mailOptions); 
};
/**
 * Sends a welcome email when a user signs up
 * @param {*} user 
 */
const sendWelcome = user => {
  const mailOptions = welcomeOptions(user);
  sendEmail(mailOptions);
};

const sendEmail = (mailOptions) => {
  transport.sendMail(mailOptions, error => {
    if (error) return console.log(error);
    return 'Email sent!';
  });
};

const newJobTemplate = (username, job) => {
  return `Hello, ${username}, this is confirmation of your job: ${job}.`;
};

const welcomeTemplate = username => {
  return `Welcome to CañU, ${username}!`;
};

function jobOptions(user, job) {
  return {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Your CañU job has been posted.',
    text: newJobTemplate(user.username, job),
  };
}

function welcomeOptions(user) {
  return {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Welcome to CañU!',
    text: welcomeTemplate(user),
  };
}

module.exports = { sendNewJob, sendWelcome, newJobTemplate, welcomeTemplate, welcomeOptions, jobOptions, sendEmail};





