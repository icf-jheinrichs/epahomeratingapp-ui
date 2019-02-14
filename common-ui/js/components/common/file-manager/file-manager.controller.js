import _findIndex from 'lodash/findIndex';
import _isEmpty from 'lodash/isEmpty';

const FILE_TYPE_ERROR = {
    type        : 'error',
    text        : 'File type not allowed.',
    dismissable : false
};

class FileManagerController {
    constructor ($element, $scope, CONTEXT, UI_ENUMS) {
        'ngInject';

        this.$element = $element;
        this.$scope = $scope;

        this.CONTEXT_IS_APP = CONTEXT === UI_ENUMS.CONTEXT.APP;
        this.CONTEXT_IS_ADMIN = CONTEXT === UI_ENUMS.CONTEXT.ADMIN;
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
        let file;
        if (event.target.files.length > 0) {
            file = event.target.files[0];

            this.addFile({
                _id  : file.lastModified,
                Name : file.name
            });
        }
    }

    triggerInput (fileInput) {
        var file = document.getElementById(fileInput);
        document.getElementById(fileInput).click();
        //Alert if file type is not pdf
        file.onchange = function pdfCheck (e) {
            var ext = this.value.match(/\.(.+)$/)[1];
            switch (ext) {
            case 'pdf':
                break;
            default:
                this.message = Object.assign({}, FILE_TYPE_ERROR);

                console.log(this.message);
                this.value = '';
            }
        };
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
        } else if (
            this.showDetails === 'File'
            && _findIndex(this.files, {Key : file.Key}) < 0
        ) {
            this.files.push(
                angular.copy({
                    Key  : file.Key,
                    Name : file.Name
                })
            );

            this.librarySelectedCallback();
        }
        if (this.uploadOnly === 'true') {
            this.$scope.$apply();
        }
    }

    removeFile (_id) {
        let index = _findIndex(this.files, {_id : _id});
        this.files.splice(index, 1);
    }
}

export default FileManagerController;
