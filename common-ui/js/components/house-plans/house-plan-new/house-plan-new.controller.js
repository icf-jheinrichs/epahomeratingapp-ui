const ERROR_INPUT = {
    type        : 'error',
    text        : 'Please select valid house plan. File extension must be .xml and file should be no larger than 200kb.',
    dismissable : false
};

const ERROR_SERVER = {
    type        : 'error',
    text        : 'There was an error processing your request. Please try again.',
    dismissable : false
};

const UPLOAD_STAGE = {
    select    : 'select',
    uploading : 'uploading',
    report    : 'report'
};

const FILE_STAGE = {
    uploading : 'uploading',
    uploaded  : 'uploaded',
    error     : 'error'
}

import _isEmpty from 'lodash/isEmpty'

class HousePlanNewController {
    constructor ($rootScope, $state, HousePlansService, UI_ENUMS) {
        'ngInject';

        this.$state            = $state;
        this.$rootScope        = $rootScope;

        this.HousePlansService = HousePlansService;
        this.MESSAGING         = UI_ENUMS.MESSAGING;

        this.uploadStage        = UPLOAD_STAGE.select;
        this.totalNumUpload     = 0;
        this.uploadRes          = {};
    }

    $onInit () {
        this.fileInput = document.getElementById('housePlanFile');
    }

    isValidFile (file) {
        return file.type === 'text/xml' && ((file.size / 1024) < 200);
    }

    onSubmit () {
        console.log(this.fileInput.files);

        if (_isEmpty(this.fileInput.files)) {
            this.errorReason  = Object.assign({}, ERROR_INPUT);
            this.message = Object.assign({}, ERROR_INPUT);
            return;
        }

        this.uploadStage = UPLOAD_STAGE.uploading;

        this.totalNumUpload = this.fileInput.files.length;

        // for (let fileIndex in this.fileInput.files) {
        //     let res = {
        //         status  : FILE_STAGE.uploading,
        //         message : ''
        //     };
        //
        //     this.uploadRes[this.fileInput.files[fileIndex].name] = res;
        // }

        let uploadPromises = [];
        let files = this.fileInput.files;
        let self = this;

        let uploadFile = function uploadFile (file) {
            return new Promise((resolve, reject) => {
                console.log(file);

                if (!self.isValidFile(file)) {
                    self.message = Object.assign({}, ERROR_INPUT);
                    return;
                }

                let formData = new window.FormData();
                formData.append('filedata', file, file.name);

                console.log('ready to post file ' + file.name);
                self.HousePlansService
                    .post(formData)
                    .then((response) => {
                        console.log(response.data);
                        if (response.code === 200 && response.data.docID) {
                            console.log('uploaded ' + response.data.docID);
                            resolve(response.data.docID);
                        }
                    })
                    .catch((error) => {
                        console.log('upload failed' + error.data.docID);
                        console.log(error);

                        // this.errorReason  = Object.assign({}, ERROR_SERVER);
                        // this.errorReason.text = error.reason;
                        //
                        // this.message = Object.assign({}, ERROR_SERVER);
                    })
                    .finally(() => {
                        console.log('finally');
                    });
            });
        };

        for (let fileIndex in files) {
            console.log(fileIndex);
            console.log('push' + files[fileIndex]);

            let file = files[fileIndex];
            if (!(file instanceof File)) {
                continue;
            }

            uploadPromises.push(uploadFile(files[fileIndex]));
        }

        Promise.all(uploadPromises).then((response) => {
            console.log('house plan all uploaded');
            console.log(response);
        });
    }
}

export default HousePlanNewController;
