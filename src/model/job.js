'use strict';

// const dataModel = require();
const jobSchema = require('./schema/jobschema.js');

class Jobs extends dataModel {
    constructor() { super(jobSchema); }

}

module.exports = new Jobs;