'use strict';

const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  jobType: { type: String },
  postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
});



module.exports = mongoose.model('jobs', jobSchema);