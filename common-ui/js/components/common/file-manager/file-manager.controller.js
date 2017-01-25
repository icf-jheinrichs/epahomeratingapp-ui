class FileManagerController {
    $onInit () {
        if (!Array.isArray(this.files)) {
            this.files = [this.files];
        }

        this.libraryName = 'From House Plan Library';
    }

    addItem (item) {
        if (this.files.indexOf(item._id) < 0) {
            this.files.push(item._id);
        }
    }

    removeFile (file) {
        let index = this.files.indexOf(file);
        this.files.splice(index, 1);
    }
}

export default FileManagerController;
