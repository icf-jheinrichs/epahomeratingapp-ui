import _sample from 'lodash/sample';

class CameraService {
    constructor ($q) {
        'ngInject';

        this.$q = $q;
    }

    getPhoto () {
        let promise = this.$q((resolve, reject) => {
            resolve(_sample(['img/job-photo-default-h.jpg', 'img/job-photo-default-v.jpg']));
        });

        return promise;
    }
}

export default CameraService;
