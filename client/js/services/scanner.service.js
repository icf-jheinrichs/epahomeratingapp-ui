class ScannerService {
    constructor ($q, BASE_IMAGE_URL) {
        'ngInject';

        this.$q             = $q;
        this.BASE_IMAGE_URL = BASE_IMAGE_URL;
    }

    getCode () {
        let promise = this.$q((resolve, reject) => {
            resolve('1234-5678-9012');
        });

        return promise;
    }
}

export default ScannerService;
