'use strict';

const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    price: { type: Number, required: true},
    jobType: {type: String},
});



module.exports = mongoose.model('jobSchema', jobSchema)