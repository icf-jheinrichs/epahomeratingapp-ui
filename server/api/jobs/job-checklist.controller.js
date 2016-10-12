'use strict';

let jobsChecklistData = require('./data/job-checklist.data');

module.exports = function jobsChecklist (req, res) {
    let err  = false;

    if (err) {
        return res.status(400).send({
            message : 'Error'
        });
    } else {
        res.json(jobsChecklistData);
    }
};
