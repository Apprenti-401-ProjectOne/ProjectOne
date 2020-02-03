'use strict';

const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  type: {type: String, required:true, enum:['admin', 'editor', 'user']},
  capabilities: {type: Array, required:true},
});


module.exports = mongoose.model('roles', roleSchema)