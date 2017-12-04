class CameraService {
    constructor ($q, BASE_IMAGE_URL) {
        'ngInject';

        this.$q             = $q;
        this.BASE_IMAGE_URL = BASE_IMAGE_URL;
    }

    getPhoto () {
        let promise = this.$q((resolve, reject) => {
            resolve('job-photo-default.jpg');
        });

        return promise;
    }
}

export default CameraService;
