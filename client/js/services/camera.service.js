class CameraService {
    constructor ($q) {
        'ngInject';

        this.$q             = $q;
    }

    getPhoto () {
        let promise = this.$q((resolve, reject) => {
            resolve('job-photo-default.jpg');
        });

        return promise;
    }
}

export default CameraService;
