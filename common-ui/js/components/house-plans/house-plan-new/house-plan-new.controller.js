/* global File */

const ERROR_INPUT = {
    type        : 'error',
    text        : 'Please select valid house plan. File extension must be .xml and file should be no larger than 200kb.',
    dismissable : false
};

const ERROR_MAX_FILES = {
    type        : 'error',
    text        : 'Please select equal or less than 50 files',
    dismissable : false
};

const UPLOAD_STAGE = {
    select    : 'select',
    uploading : 'uploading',
    report    : 'report'
};

const MAX_NUM_OF_FILE_UPLOAD = 50;

import _isEmpty from 'lodash/isEmpty';
import _defer from 'lodash/defer';

class HousePlanNewController {
    constructor ($rootScope, $scope, $state, HousePlansService, UI_ENUMS) {
        'ngInject';

        this.$state            = $state;
        this.STATE_NAME        = UI_ENUMS.STATE_NAME;
        this.$rootScope        = $rootScope;
        this.$scope            = $scope;

        this.HousePlansService = HousePlansService;
        this.MESSAGING         = UI_ENUMS.MESSAGING;

        this.uploadStage        = UPLOAD_STAGE.select;
        this.totalNumUpload     = 0;
        this.uploadReport       = [];
        this.uploadedHousePlans = [];
        this.uploadedHousePlanIDs = [];

        this.resetUploadProgress();
    }

    $onInit () {
        this.fileInput = document.getElementById('housePlanFile');
    }

    isValidFile (file) {
        return file.type === 'text/xml' && ((file.size / 1024) < 200);
    }

    resetUploadProgress (total) {
        this.uploadProgress = {
            total    : total || 0,
            progress : 0
        };

        this.uploadedHousePlans   = [];
        this.uploadedHousePlanIDs = [];
    }

    onSubmit () {
        if (_isEmpty(this.fileInput.files)) {
            this.errorReason  = Object.assign({}, ERROR_INPUT);
            this.message = Object.assign({}, ERROR_INPUT);
            return;
        } else if (this.fileInput.files.length > MAX_NUM_OF_FILE_UPLOAD) {
            this.errorReason  = Object.assign({}, ERROR_MAX_FILES);
            this.message = Object.assign({}, ERROR_MAX_FILES);
            return;
        }

        this.uploadStage    = UPLOAD_STAGE.uploading;
        this.totalNumUpload = this.fileInput.files.length;

        let uploadPromises = [];
        let files          = this.fileInput.files;
        let self           = this;

        let uploadFile = function uploadFile (file) {
            return new Promise((resolve, reject) => {
                if (!self.isValidFile(file)) {
                    self.message = Object.assign({}, ERROR_INPUT);
                    return;
                }

                let formData = new window.FormData();
                formData.append('filedata', file, file.name);

                self.HousePlansService
                    .post(formData)
                    .then((response) => {
                        if (response.code === 200 && response.data.docID) {
                            self.uploadProgress.progress++;
                            response.data.fileName = file.name;
                            resolve({
                                success  : true,
                                docID    : response.data.docID,
                                fileName : file.name,
                                data     : response.data
                            });
                        }
                    })
                    .catch((error) => {
                        self.uploadProgress.progress++;
                        resolve({
                            success     : false,
                            fileName    : file.name,
                            errorReason : error.reason
                        });
                    });
            });
        };

        this.resetUploadProgress(files.length);

        for (let fileIndex in files) {
            let file = files[fileIndex];
            if (!(file instanceof File)) {
                continue;
            }
            uploadPromises.push(uploadFile(files[fileIndex]));
        }

        Promise.all(uploadPromises)
            .then((response) => {
                self.uploadStage = UPLOAD_STAGE.report;

                for (let index in response) {
                    if (response[index].success === false) {
                        self.uploadReport.push(response[index]);
                    } else {
                        self.uploadedHousePlans.push(response[index].data);
                        this.uploadedHousePlanIDs.push(response[index].docID);
                    }
                }

                this.$rootScope.$emit(this.MESSAGING.HOUSE_PLAN_NEW_BULK, self.uploadedHousePlans);

                _defer(function afterDigest () {
                    self.$scope.$apply();
                });
            });
    }

    goToBulkEdit () {
        if (this.uploadedHousePlanIDs.length === 0) {
            this.$state.go('^');
        } else {
            this.$state.go(this.STATE_NAME.HOUSE_LIBRARY_EDIT_BULK, {housePlanIDs : this.uploadedHousePlanIDs});
        }
    }
}

export default HousePlanNewController;
