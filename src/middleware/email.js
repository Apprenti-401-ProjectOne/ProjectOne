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

/**
 * Sends an email on creation of a new job
 * @param {object} user user object 
 * @param {job} job user object
 */
const sendNewJob = (user, job) => {
  const mailOptions = jobOptions(user, job); 
  sendEmail(mailOptions); 
};
/**
 * Sends a welcome email when a user signs up
 * @param {object} user  object with user info
 */
const sendWelcome = user => {
  const mailOptions = welcomeOptions(user);
  sendEmail(mailOptions);
};

/**
 * send an email with specific options
 * @param {function} mailOptions returns an object with mail options
 * @returns 'Email sent!'
 */
const sendEmail = (mailOptions) => {
  transport.sendMail(mailOptions, error => {
    if (error) return console.log(error);
    return 'Email sent!';
  });
};

/**
 * Template for new job email
 * @param {string} username username string
 * @param {object} job job object
 * @returns String confirming job
 */
const newJobTemplate = (username, job) => {
  return `Hello, ${username}, this is confirmation of your job: ${job}.`;
};

/**
 * Template for user creation welcome email
 * @param {string} username username string
 * @returns String welcoming user
 */
const welcomeTemplate = username => {
  return `Welcome to CañU, ${username}!`;
};

/**
 * Template for job email headers
 * @param {object} user user info object
 * @param {object} job job info object
 * @returns template with from, to, subject, and text
 */
function jobOptions(user, job) {
  return {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Your CañU job has been posted.',
    text: newJobTemplate(user.username, job),
  };
}

/**
 * Template for welcome emaul headers
 * @param {object} user user info object
 * @returns template with from, to, subject, and text
 */
function welcomeOptions(user) {
  return {

    from: process.env.EMAIL,
    to: user.email,
    subject: 'Welcome to CañU!',
    text: welcomeTemplate(user),
  };
}

/** 
 * Functions to facilitate auto generated emails when users signup, create jobs, or jobs are updated
 * @module autoEmail
*/
module.exports = { sendNewJob, sendWelcome, newJobTemplate, welcomeTemplate, welcomeOptions, jobOptions, sendEmail};




