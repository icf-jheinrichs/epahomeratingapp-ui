'use strict';

let displayLogicDigestData = require('./data/display-logic-digest.data');

module.exports = function displayLogicDigest (req, res) {
    let err  = false;

    if (err) {
        return res.status(400).send({
            message : 'Error'
        });
    } else {
        res.json(displayLogicDigestData);
    }
};
