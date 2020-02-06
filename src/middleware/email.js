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

const transpoOpt =  { service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
};

function sendNewJob(user, job){  
  const mailOptions = jobOptions(user, job);   
  const transporter = nodemailer.createTransport(transpoOpt);
  transporter.sendMail(mailOptions, error => {
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

function newJobTemplate(username, job){
  return `Hello, ${username}, this is confirmation of your job: ${job}.`;
};

function welcomeTemplate(username){
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
    text: welcomeTemplate(user.username),
  };
}

module.exports = { sendNewJob, sendWelcome, newJobTemplate, welcomeTemplate, welcomeOptions, jobOptions};




