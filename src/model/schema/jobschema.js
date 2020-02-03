'use strict';

const mongoose = require('mongoose');

const Jobs = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  price: { type: Number, required: true},
  jobType: {type: String},
});



module.exports = mongoose.model('Jobs', Jobs);
// module.exports = new Jobs