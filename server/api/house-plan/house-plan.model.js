'use strict';

let AWS           = require('aws-sdk');
AWS.config.region = 'us-east-1';
let Promise       = require('bluebird');

module.exports.create = function createHousePlan () {
    return new Promise((resolve, reject) => {
        resolve('asdfasdf');
    });
};
