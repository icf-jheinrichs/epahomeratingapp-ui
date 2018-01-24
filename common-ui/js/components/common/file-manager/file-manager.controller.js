import _findIndex from 'lodash/findIndex';
import _isEmpty from 'lodash/isEmpty';

class FileManagerController {
    constructor ($element, $scope, CONTEXT, UI_ENUMS) {
        'ngInject';

        this.$element  = $element;
        this.$scope    = $scope;

        this.CONTEXT_IS_ADMIN = CONTEXT !== UI_ENUMS.CONTEXT.APP;
    }

    $onInit () {
        if (!Array.isArray(this.files)) {
            this.files = [this.files];
        }

        this.eventListener = this.handleFileChange.bind(this);
    }

    $postLink () {
        if (this.uploadOnly === 'true') {
            this.$element[0].addEventListener('change', this.eventListener, true);
        }
    }

    $onDestroy () {
        if (this.uploadOnly === 'true') {
            this.$element[0].removeEventListener('change', this.eventListener, true);
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
        document.getElementById(fileInput).click();
    }

    addFile (file) {
        if (this.$scope.LocalFiles !== undefined && !_isEmpty(this.$scope.LocalFiles)) {
            return; // don't allow select local and library at the same time
        }

        if (this.showDetails === 'HousePlanLibrary' && _findIndex(this.files, {_id : file._id}) < 0) {
            this.files.push({
                _id  : file._id,
                Name : file.Name
            });

            this.librarySelectedCallback();
        } else if (this.showDetails === 'File' && _findIndex(this.files, {Key : file.Key}) < 0) {
            this.files.push({
                Key  : file.Key,
                Name : file.Name
            });

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
