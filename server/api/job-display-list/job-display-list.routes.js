'use strict';

let jobDisplayList = require('./jobs.controller');

module.exports = function jobsRoutes (app) {
    app.route('/api/job-display-list/:_id')
        .get(jobDisplayList.get);
};
