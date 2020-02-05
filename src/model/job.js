'use strict';

const mongoose = require('mongoose');
const email = require('../middleware/email.js');

const jobSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  currentBidder: { type: String, default: '' },
  jobType: { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  isOpen: { type: Boolean, default: true },
});

jobSchema.post('findByIdAndUpdate', function (doc) {
  email.sendUpdate(doc.name);
});


/** 
 * Jobs model
 * @module Jobs
*/
module.exports = mongoose.model('jobs', jobSchema);