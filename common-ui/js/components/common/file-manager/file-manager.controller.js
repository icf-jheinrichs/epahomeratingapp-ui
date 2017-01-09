class FileManagerController {
    $onInit () {
        this.allowFromComputer = true;
        this.libraryName = 'From House Plan Library';
    }

    removeFile (FileId) {
        this.files = this.files.filter((file) => {
            return file.Id !== FileId;
        });
    }
}

export default FileManagerController;
