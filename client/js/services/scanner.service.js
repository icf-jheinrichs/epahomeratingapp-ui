import _random from 'lodash/random';

class ScannerService {
    constructor ($q) {
        'ngInject';

        this.$q             = $q;
    }

    scanBarCode () {
        let promise = this.$q((resolve, reject) => {
            resolve(`${_random(1, 9)}234-${_random(1, 9)}678-${_random(1, 9)}012`);
        });

        return promise;
    }
}

export default ScannerService;
