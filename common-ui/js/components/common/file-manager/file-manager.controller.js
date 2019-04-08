/* global File */

import _findIndex from 'lodash/findIndex';
import _isEmpty from 'lodash/isEmpty';

const FILE_TYPE_ERROR = {
    type        : 'error',
    text        : 'Some selected files were not the right type and were skipped.',
    dismissable : false
};
class FileManagerController {
    constructor ($element, $scope, $rootScope, FileUtilityService, CONTEXT, UI_ENUMS) {
        'ngInject';

        this.$element   = $element;
        this.$scope     = $scope;
        this.$rootScope = $rootScope;

        this.FileUtilityService = FileUtilityService;
        this.CONTEXT_IS_ADMIN   = CONTEXT === UI_ENUMS.CONTEXT.ADMIN;
    }

    $onInit () {
        if (!Array.isArray(this.files)) {
            this.files = [this.files];
        }
        this.message = {};
        this.eventListener = this.handleFileChange.bind(this);
    }

    $postLink () {
        if (this.uploadOnly === 'true') {
            this.$element[0].addEventListener(
                'change',
                this.eventListener,
                true
            );
        }
    }

    handleFileTypeError () {
        this.message = Object.assign({}, FILE_TYPE_ERROR);
    }

    $onDestroy () {
        if (this.uploadOnly === 'true') {
            this.$element[0].removeEventListener(
                'change',
                this.eventListener,
                true
            );
        }
    }

    handleFileChange (event) {
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
            default :
                this.addFile(file);
                break;
            }
        }

        if (fileErrors) {
            this.handleFileTypeError();
        }

        if (this.uploadOnly === 'true') {
            this.$scope.$apply();
        }
    }

    triggerInput (fileInput) {
        document.getElementById(fileInput).click();
    }

    addFile (file) {
        if (
            this.$scope.LocalFiles !== undefined
            && !_isEmpty(this.$scope.LocalFiles)
        ) {
            return; // don't allow select local and library at the same time
        }

        if (
            this.showDetails === 'HousePlanLibrary'
            && _findIndex(this.files, {_id : file._id}) < 0
        ) {
            this.files.push({
                _id  : file._id,
                Name : file.Name
            });

            this.librarySelectedCallback();
        } else if (this.showDetails === 'File') {
            this.files.push(file);
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
}

export default FileManagerController;
