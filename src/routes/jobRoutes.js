'use strict';

const express = require('express');
const router = express.Router();
const Jobs = require('../model/job');


/**
 *  Routes
 */
router.get('/jobs', handleGetAll);
router.post('/jobs', handlePost);
router.get('/jobs/:id', handleGetOne);
router.put('/jobs/:id', handlePut);
router.delete('/jobs/:id', handleDelete);


/**
 * handles all requests 
 * @function handleGetAll
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handleGetAll(req, res, next) {
  // let jobs = new Jobs();
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
function handleGetOne(req, res, next) {
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
function handlePost(req, res, next) {
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
function handlePut(req, res, next) {
  let id = req.params.id;
  Jobs.put(id, req.body)
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
function handleDelete(req, res, next) {
  let id = req.params.id;
  Jobs.deleteOne({_id: id})
    .then(result => res.status(200).json(result))
    .catch(next);
}

module.exports = router;