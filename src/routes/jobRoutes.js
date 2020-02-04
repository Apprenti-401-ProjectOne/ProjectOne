'use strict';

const express = require('express');
const router = express.Router();
const Jobs = require('../model/job');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
// const join = require('../authmiddleware/join');

/**
 *  Routes
 */
router.get('/jobs', getAllJobs);
router.post('/jobs', jobPost);
router.get('/jobs/:id', getOneJob);
router.put('/jobs/:id', jobUpdate);
router.delete('/jobs/:id', jobDelete);

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

module.exports = router;