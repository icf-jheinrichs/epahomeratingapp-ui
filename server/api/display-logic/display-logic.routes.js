'use strict';

let displayLogicDigest   = require('./display-logic-digest.controller');

module.exports = function displayLogicRoutes (app) {
    app.route('/api/display-logic/digest')
        .get(displayLogicDigest);
};
