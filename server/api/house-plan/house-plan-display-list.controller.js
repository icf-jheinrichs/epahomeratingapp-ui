'use strict';

let housePlanDisplayListData = require('./data/house-plan-display-list.data');

module.exports = function housePlanDisplayList (req, res) {
    let err  = false;

    if (err) {
        return res.status(400).send({
            message : 'Error'
        });
    } else {
        res.json(housePlanDisplayListData);
    }
};
