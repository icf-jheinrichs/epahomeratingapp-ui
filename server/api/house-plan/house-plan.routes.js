'use strict';

let housePlanDisplayList = require('./house-plan-display-list.controller');

module.exports = function housePlanRoutes (app) {
    app.route('/api/house-plan/display-list/:_id')
        .get(housePlanDisplayList);
};
