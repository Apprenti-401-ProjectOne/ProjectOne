'use strict';

const express = require('express');
const jobRouter = express.Router();
const Jobs = require('../model/job');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const bearer = require('../authmiddleware/bearer');

/**
 *  Routes
 */
jobRouter.get('/jobs', getAllJobs);
jobRouter.post('/jobs', jobPost);
jobRouter.get('/jobs/:id', getOneJob);
jobRouter.put('/jobs/:id', jobUpdate);
jobRouter.delete('/jobs/:id', bearer, jobDelete);
jobRouter.put('/jobs/bid/:id', bearer, bidOnJob);
jobRouter.put('/jobs/close/:id', bearer, closeJob);

/**
 * Place a bid on a job
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function bidOnJob(req, res){
  const id = req.params.id;
  const price = req.body.price;
  let token = req.headers.authorization.split(' ').pop();
  let parsedToken = jwt.verify(token, process.env.SECRET);
  Jobs.findByIdAndUpdate(id, {
    price: price,
    currentBidder: parsedToken.username,
  })
    .then(record => {
      res.send(record);
    })
    .catch(error => {
      res.send(error);
    });    
}

/**
 *  Close a job from bidding
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function closeJob(req, res){
  let token = req.headers.authorization.split(' ').pop();
  let parsedToken = jwt.verify(token, process.env.SECRET);
  const id = req.params.id;
  Jobs.findById(id).then(job => {  
    if(job.postedBy == parsedToken.id){      
      Jobs.findByIdAndUpdate(id, {isOpen: false})
        .then( _ => res.send('Job closed'))
        .catch(err => res.send(err));
    } else res.send('Unauthorized');
  })
    .catch(err => res.send(err));
}


/**
 * gets all jobs from database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function getAllJobs(req, res, next) {
  Jobs.find({})
    .then(records => {
      const output = {
        count: records.length,
        results: records,
      };
      res.status(200).json(output);
    })
    .catch(err => next(err));
}


/**
 * handles and records one request
 * @function handleGetOne
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function getOneJob(req, res, next) {
  let id = req.params.id;
  Jobs.findOne({_id: id})
    .populate('users')
    .exec(async function (err, job) {
      if (err) return console.error(err);
      let user = await User.findOne({_id: job.postedBy}, 'username');
      job.postedBy = user;
      res.json(job);
    });
   
}


/**
 * handles route that creates a record
 * @function handlePost
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function jobPost(req, res, next) {
  let token = req.headers.authorization.split(' ').pop();
  let parsedToken = jwt.verify(token,process.env.SECRET);
  let user = await User.findOne({ _id: parsedToken.id });

  user.jobs.push(req.body);
  user.save();
  console.log(user);
  let jobs = new Jobs({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    jobType: req.body.jobType,
    postedBy: user._id,
    postedUser: user.username,
  });
  
  jobs.save()
    .then(result => res.status(200).json(result))
    .catch(err => next(err));
}


/**
 * handles route for updating record
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function jobUpdate(req, res, next) {
  let id = req.params.id;
  Jobs.findByIdAndUpdate(id, req.body, {new: true})
    .then(result => res.status(200).json(result))
    .catch(err => next(err));
}


/**
 * handles route that deletes a record
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function jobDelete(req, res, next) {
  let id = req.params.id;
  Jobs.findByIdAndDelete(id)
    .then(result => res.status(200).json(result))
    .catch(err => next(err));
}

/** 
 * contains routes and routeHandler functions for all job routes
 * @module jobsRouter
*/
module.exports = {jobRouter, jobDelete, jobUpdate, jobPost, getOneJob, getAllJobs, closeJob, bidOnJob};
