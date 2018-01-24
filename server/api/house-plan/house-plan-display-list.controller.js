'use strict';

let housePlanModel = require('./house-plan.model.js');
let formidable     = require('formidable');
let bunyan         = require('bunyan');
let path           = require('path');

let log            = bunyan.createLogger({name : 'house-plan.controller.logger'});
const fileDir      = '/upload/';

module.exports.create = function postHousePlan (req, res) {
    const ratingCompanyID = req.headers['ratingcompanyid'];
    const uploadType      = req.headers['uploadtype'];

    let form              = new formidable.IncomingForm();
    let fileName          = '';
    let filePath          = '';

    form.multiples        = true;
    form.uploadDir        = path.join(__dirname, fileDir);

    form.on('file', function formOnFile (field, file) {
        log.info('form on file ' + file.path);
        fileName = file.name;
        filePath = file.path;
        //fs.rename(file.path, path.join(form.uploadDir, 'rem.xml'));
    });

    form.on('error', function formOnError (err) {
        //this.$log.log('An error has occured: \n' + err);
        let resResponse = {
            status  : 'error',
            code    : 500,
            message : 'file read error',
            error   : err,
            data    : null
        };
        res.send(resResponse);
    });

    form.on('end', function formOnEnd () {
        housePlanModel
            .create(fileName, filePath, ratingCompanyID, uploadType)
            .then((docID) => {
                let resResponse = {
                    status  : 'success',
                    code    : 200,
                    message : 'success',
                    error   : null,
                    data    : null
                };
                res.json(resResponse);
            })
            .catch((error) => {
                log.info(error);
                let resResponse = {
                    status  : 'error',
                    code    : 500,
                    message : 'create house plan error',
                    error   : error,
                    data    : null
                };
                res.status(500).send(resResponse);
            });
    });

    form.parse(req);
};
