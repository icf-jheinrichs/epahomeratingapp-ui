class JobDataResponseService {
    constructor ($q, $rootScope, $http, API_URL, UI_ENUMS) {
        'ngInject';

        this.$q         = $q;
        this.$http      = $http;
        this.$rootScope = $rootScope;

        this.API_URL    = API_URL;
        this.MESSAGING  = UI_ENUMS.MESSAGING;
    }

    getById (_id, ratingCompanyID) {
        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${this.API_URL.JOB_DATA_RESPONSE}/${_id}`,
                    ratingCompanyID
                })
                .then((response) => {
                    if (response.status === 200) {
                        resolve(response.data);
                    } else {
                        //TODO: make this not bad.
                        reject('something\'s amiss');
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });

        return promise;
    }

    put (jobDataResponse) {
        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'PUT',
                    url     : `${this.API_URL.JOB_DATA_RESPONSE}/${jobDataResponse._id}`,
                    data    : jobDataResponse
                })
                .catch((err) => {
                    reject(err);
                });
        });

        return promise;
    }
}

export default JobDataResponseService;
