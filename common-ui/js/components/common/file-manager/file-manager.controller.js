import _findIndex from 'lodash/findIndex';

class FileManagerController {
    constructor ($element, $scope) {
        'ngInject';

        this.$element = $element;
        this.$scope   = $scope;
    }

    $onInit () {
        if (!Array.isArray(this.files)) {
            this.files = [this.files];
        }

        this.libraryName   = 'From House Plan Library';
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

    addFile (file) {
        // debugger;

        if (_findIndex(this.files, {_id : file._id}) < 0) {
            this.files.push({
                _id  : file._id,
                Name : file.Name
            });
        }

        if (this.uploadOnly === 'true') {
            this.$scope.$apply();
        }
    }

    removeFile (_id) {
        // debugger;

        let index = _findIndex(this.files, {_id : _id});
        this.files.splice(index, 1);
    }
}

export default FileManagerController;
