'use strict';

const express = require('express');
const router = express.Router();
const Jobs = require('../model/job');

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
  req.model.get(id)
    .then(record => res.json(record))
    .catch(next);
}


/**
 * handles route that creates a record
 * @function handlePost
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function jobPost(req, res, next) {
  let jobs = new Jobs(req.body);
  jobs.save(req.body)
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