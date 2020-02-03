'use strict';

const express = require('express');
const router = express.Router();

function getJobs(req, res, next) {
  let model = req.params.model;
  req.model = jobs;
  next();
}

router.param('model', getJobs);


/**
 *  Routes
 */
router.get('/api/v1/model', handleGetAll);
router.post('/api/v1/model', handlePost);
router.get('/api/v1/model/:id', handleGetOne);
router.put('/api/v1/model/:id', handlePut);
router.delete('/api/v1/model/:id', handleDelete);


/**
 * handles all requests 
 * @function handleGetAll
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handleGetAll(req, res, next) {
  req.model.get()
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
  req.model.post(req.body)
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
  req.model.put(id, req.body)
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
  req.model.delete(id)
    .then(result => res.status(200).json(result))
    .catch(next);
}

module.exports = router;