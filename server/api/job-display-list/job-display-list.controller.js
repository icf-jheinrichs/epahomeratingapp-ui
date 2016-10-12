'use strict';

let jobsDisplayListData = require('./data/job-display-list.data');

module.exports.get = function getJobsDisplayList (req, res) {
    let err  = false;

    if (err) {
        return res.status(400).send({
            message : 'Error'
        });
    } else {
        res.json(jobsDisplayListData);
    }
};
