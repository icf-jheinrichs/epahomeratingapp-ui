class JobDataResponseService {
    constructor ($q, $http, API_URL) {
        'ngInject';

        this.$q        = $q;
        this.$http     = $http;

        this.API_URL   = API_URL;
    }

    getById (_id) {
        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${this.API_URL.JOB_DATA_RESPONSE}/${_id}`
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
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });

        return promise;
    }
}

export default JobDataResponseService;
