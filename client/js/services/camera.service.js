class CameraService {
    constructor ($q) {
        'ngInject';

        this.$q = $q;
    }

    getPhoto () {
        let deferred = this.$q.defer();

        deferred.resolve('img/job-photo-default.jpg');

        return deferred.promise;
    }
}

export default CameraService;
