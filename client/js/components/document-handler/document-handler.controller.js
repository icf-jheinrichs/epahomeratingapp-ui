import FileSaver from 'file-saver';

class DocumentHandlerController {
    constructor ($http, S3_CONFIG) {
        'ngInject';

        this.$http    = $http;
        this.s3Bucket = `${S3_CONFIG.S3_BUCKET_NAME_PREFIX}-rating-company`;
    }

    downloadFile (url, fileName) {
        this
            .$http({
                method       : 'GET',
                url          : url,
                responseType : 'blob',
                headers      : {
                    authorize : false
                }
            })
            .then((response) => {
                FileSaver.saveAs(response.data, fileName);
            });
    }
}

export default DocumentHandlerController;
