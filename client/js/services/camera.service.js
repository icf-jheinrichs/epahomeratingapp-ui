import _ from 'lodash';

class CameraService {
    constructor ($q) {
        'ngInject';

        this.$q = $q;
    }

    getPhoto () {
        let deferred = this.$q.defer();

        deferred.resolve(_.sample(['img/job-photo-default-h.jpg', 'img/job-photo-default-v.jpg']));

        return deferred.promise;
    }
}

export default CameraService;
