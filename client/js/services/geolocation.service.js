class GeolocationService {
    constructor ($q) {
        'ngInject';

        this.$q = $q;
    }

    getLocation () {
        return this.$q((resolve, reject) => {
            resolve(undefined);
        });
    }
}

export default GeolocationService;
