'use strict';

let housePlanController = require('./house-plan-display-list.controller');

module.exports = function housePlanRouter (app) {
    app
        .route('/api/house_plan')
        .post(housePlanController.create);
};
