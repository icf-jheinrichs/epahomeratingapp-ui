/* global File */

let FileSaver  = require('file-saver');


import _findIndex from 'lodash/findIndex';
import _isEmpty from 'lodash/isEmpty';

const FILE_TYPE_ERROR = {
    type        : 'error',
    text        : 'Some selected files were not the right type and were skipped.',
    dismissable : false
};
class FileManagerController {
    constructor ($element, $scope, $rootScope, FileUtilityService, CONTEXT, UI_ENUMS, S3_CONFIG, DialogService, $http) {
        'ngInject';

        this.$element      = $element;
        this.$scope        = $scope;
        this.$rootScope    = $rootScope;
        this.DialogService = DialogService;
        this.$http         = $http;

        this.FileUtilityService = FileUtilityService;
        this.CONTEXT_IS_ADMIN   = CONTEXT === UI_ENUMS.CONTEXT.ADMIN;
        this.s3Bucket               = `${S3_CONFIG.S3_BUCKET_NAME_PREFIX}-rating-company`;
    }

    $onInit () {
        if (!Array.isArray(this.files)) {
            this.files = [this.files];
        }
        this.downloadable = this.downloadable;
        this.message = {};
        this.eventListener = this.handleInputFileChange.bind(this);
    }

    $postLink () {
        this.$element[0].addEventListener(
            'change',
            this.eventListener,
            true
        );
    }

    handleInputFileClick (event) {
        event.target.value = null;
    }

    handleFileTypeError () {
        this.message = Object.assign({}, FILE_TYPE_ERROR);
    }

    $onDestroy () {
        this.$element[0].removeEventListener(
            'change',
            this.eventListener,
            true
        );
    }

    handleInputFileChange (event) {
        if (event.target.getAttribute('type') !== 'file') {
            return;
        }

        this.message = {};
        let fileErrors = false;

        for (let index = 0; index < event.target.files.length; index++) {
            const file = event.target.files[index];

            switch (this.accept) {
            case 'application/pdf' :
                if (this.FileUtilityService.isValidPdf(file)) {
                    this.addFile(file);
                } else {
                    fileErrors = true;
                }
                break;
            case 'text/xml' :
                if (this.FileUtilityService.isValidXml(file)) {
                    this.addFile(file);
                } else {
                    fileErrors = true;
                }
                break;
            default :
                this.addFile(file);
                break;
            }
        }

        if (fileErrors) {
            this.handleFileTypeError();
        }

        this.$scope.$apply();
    }

    triggerInput (fileInput) {
        document.getElementById(fileInput).click();
    }

    addFile (file) {
        this.files.push(file);

        this.localSelectedCallback();
    }

    addFileFromLibrary (file) {
        if (_findIndex(this.files, {_id : file._id}) < 0) {
            this.files.push({
                _id  : file._id,
                Name : file.Name
            });

            this.librarySelectedCallback();
        }
    }

    removeFile (fileToRemove) {
        let index = this.files.findIndex(file => {
            if (file instanceof File) {
                return fileToRemove.name === file.name;
            } else {
                return fileToRemove.Name === file.Name;
            }
        });

        if (index >= 0) {
            this.files.splice(index, 1);
        }
    }
    getHvacUrl(hvac) {
      return 'https://s3.amazonaws.com/' + this.s3Bucket + '/' + hvac.Key;
    }

    downloadFile(e) {
      try {
        let url = e.target.dataset['url'];
        let config = {
            method  : 'GET',
            url     : url,
            headers : {
                Authorization : 'Remove in Interceptor'
            }
        };

        this.$http(config).then((arraybuffer) => {
            FileSaver.saveAs(e.target.dataset['url'], e.target.attributes['download'].nodeValue);
        }).catch((err) => {
          this
              .DialogService
              .openDialog('dialog-hvac-error')
        })
      } catch (err) {

        this
            .DialogService
            .openDialog('dialog-hvac-error')
      }
    }
}

export default FileManagerController;
