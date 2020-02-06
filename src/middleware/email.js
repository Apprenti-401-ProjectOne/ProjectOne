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
 * Sends an email to a user when they create a new job
 * @param {*} user 
 * @param {*} job 
 * @returns string
 */
function sendNewJob(user, job){  
  const mailOptions = jobOptions(user, job);   
  
  transport.sendMail(mailOptions, error => {
    if (error) return console.log(error);
    return 'Email sent!';
  });
}


/**
 * Sends a welcome email when a user signs up
 * @param {*} user 
 */
function sendWelcome(user){
  console.log('sending welcome!');
  const mailOptions = welcomeOptions(user);
  transport.sendMail(mailOptions, error => {
    if (error) return console.log(error);
    return 'Email sent!';
  });
}

/**
 * Creates a string for the email when creating a new job
 * @param {*} username 
 * @param {*} job 
 * @return string
 */
function newJobTemplate(username, job){
  return `Hello, ${username}, this is confirmation of your job: ${job}.`;
}

/**
 * Creates a string for the email when a new user signs up
 * @param {*} username 
 * @return string
 */
function welcomeTemplate(username){
  return `Welcome to CañU, ${username}!`;
}

/**
 * Creates options for the email transporter to send a new job email
 * @param {*} user 
 * @param {*} job 
 * @returns object
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
 * Creates options for the email transporter to send a welcome email
 * @param {*} user 
 * @returns object
 */
function welcomeOptions(user) {
  return {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Welcome to CañU!',
    text: welcomeTemplate(user.username),
  };
}


/**
 * A module for sending out emails when specific actions are taken
 * @module
 */
module.exports = { sendNewJob, sendWelcome, newJobTemplate, welcomeTemplate, welcomeOptions, jobOptions};




