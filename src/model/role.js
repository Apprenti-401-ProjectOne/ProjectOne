'use strict';

const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  type: {type: String, required:true, enum:['admin', 'user']},
  capabilities: {type: Array, required:true},
});

/** 
 * Roles model
 * @module Roles
*/
module.exports = mongoose.model('roles', roleSchema);