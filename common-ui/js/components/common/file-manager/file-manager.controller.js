class FileManagerController {
    constructor () {
        'ngInject';

    }

    $onInit () {
        this.allowFromComputer = true;
        this.showActionsDropDown = false;
        this.libraryName = 'From House Plan Library';
    }

    //TODO: all dropdown stuff belongs in a directive
    toggleDropDown () {
        this.showActionsDropDown = !this.showActionsDropDown;
    }

    //TODO: all dropdown stuff belongs in a directive
    hideDropDown () {
        this.showActionsDropDown = false;
    }

    removeFile (FileId) {
        this.files = this.files.filter((file) => {
            return file.Id !== FileId;
        });
    }
}

export default FileManagerController;
