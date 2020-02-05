'use strict';

const express = require('express');
const router = express.Router();
const Jobs = require('../model/job');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const bearer = require('../authmiddleware/bearer');


/**
 *  Routes
 */
router.get('/jobs', getAllJobs);
router.post('/jobs', jobPost);
router.get('/jobs/:id', getOneJob);
router.put('/jobs/:id', jobUpdate);
router.delete('/jobs/:id', jobDelete);
router.put('/jobs/bid/:id', bearer, bidOnJob);
router.put('/jobs/close/:id', bearer, closeJob);

/**
 * Place a bid on a job
 * @param {*} req 
 * @param {*} res 
 */
function bidOnJob(req, res){
  const id = req.params.id;
  const price = req.body.price;
  let token = req.headers.authorization.split(' ').pop();
  let parsedToken = jwt.verify(token, process.env.SECRET);
  Jobs.findByIdAndUpdate(id, {price: price, currentBidder: parsedToken.username})
    .then(record => {
      res.send(record);
    })
    .catch(error => {
      res.send(error);
    });    
}

/**
 *  Close a job from bidding
 * @param {*} req 
 * @param {*} res 
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
 * 
 * @function handleGetAll
 * @param {*} req
 * @param {*} res
 * @param {*} next
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
    .catch(next);
}


/**
 * handles and records one request
 * @function handleGetOne
 * @param {*} req
 * @param {*} res
 * @param {*} next
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
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function jobPost(req, res, next) {
  console.log(req);
  let token = req.headers.authorization.split(' ').pop();
  let parsedToken = jwt.verify(token,process.env.SECRET);
  let user = await User.findOne({ _id: parsedToken.id });
  user.jobs.push(req.body);
  user.save();
  let jobs = new Jobs({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    jobType: req.body.jobType,
    postedBy: user._id,
  });

  
  jobs.save()
    .then(result => res.status(200).json(result))
    .catch(next);
}


/**
 * handles route for updating record
 * @function handlePut
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function jobUpdate(req, res, next) {
  let id = req.params.id;
  Jobs.findByIdAndUpdate(id, req.body, {new: true})
    .then(result => res.status(200).json(result))
    .catch(next);
}


/**
 * handles route that deletes a record
 * @function handleGetAll
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function jobDelete(req, res, next) {
  let id = req.params.id;
  Jobs.findByIdAndDelete(id)
    .then(result => res.status(200).json(result))
    .catch(next);
}

/** 
 * contains routes and routeHandler functions for all job routes
 * @module jobsRouter
*/
module.exports = router;