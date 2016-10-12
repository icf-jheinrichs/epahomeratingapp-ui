'use strict';

let _    = require('lodash');
let jobs = require('./data/jobs.data.js');
let jobData = require('./data/job-data.data.js');

function getJob (req, res) {
    let _id = req.params._id;
    let job = _.find(jobs, {'_id' : _id});

    if (job) {
        res.json(job);
    } else {
        return res.status(400).send({
            message : 'Job not found'
        });
    }
}

function getJobsList (req, res) {
    let err  = false;

    if (err) {
        return res.status(400).send({
            message : 'Error'
        });
    } else {
        res.json(jobs);
    }
}

function getJobData (req, res) {
    let err  = false;

    if (err) {
        return res.status(400).send({
            message : 'Error'
        });
    } else {
        res.json(jobData);
    }
}

module.exports = {
    getJob     : getJob,
    getList    : getJobsList,
    getJobData : getJobData
};
