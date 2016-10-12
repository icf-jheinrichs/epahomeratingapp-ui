'use strict';

let jobsPolicy   = require('./jobs.policy');
let jobs         = require('./jobs.controller');
let jobChecklist = require('./job-checklist.controller');

module.exports = function jobsRoutes (app) {
    app.route('/api/jobs')
        .all(jobsPolicy.isAllowed)
        .get(jobs.getList);

    app.route('/api/jobs/:_id')
        .all(jobsPolicy.isAllowed)
        .get(jobs.getJob);

    app.route('/api/jobs/data/:_id')
        .all(jobsPolicy.isAllowed)
        .get(jobs.getJobData);

    app.route('/api/job-checklist/:_id')
        .all(jobsPolicy.isAllowed)
        .get(jobChecklist);
};
