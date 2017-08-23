import _findIndex from 'lodash/findIndex';
import _defer from 'lodash/defer';

class FileManagerController {
    constructor ($element, $scope) {
        'ngInject';

        this.$element  = $element;
        this.$scope    = $scope;

        $scope.LocalFile = [];
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

    addFile (file) {
        if (this.$scope.LocalFiles.length !== 0) {
            return; // don't allow select local and library at the same time
        }

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

    removeLocalFile (name, lastModified) {
        this.$scope.LocalFiles = {};

        // TODO - remove single file from asset
        // for (let fileIndex in this.$scope.LocalFiles) {
        //     let file = this.$scope.LocalFiles[fileIndex];
        //     if (file.name === name && file.lastModified === lastModified) {
        //         console.log('delete ' + fileIndex);
        //         delete this.$scope.LocalFiles[fileIndex];
        //     }
        // }
    }
}

export default FileManagerController;
