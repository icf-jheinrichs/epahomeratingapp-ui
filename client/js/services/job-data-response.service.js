class JobDataResponseService {
    constructor ($q, $http, DB) {
        'ngInject';

        this.$q    = $q;
        this.$http = $http;
    }

    getById (_id) {
        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `https://37m3ie0ju8.execute-api.us-east-1.amazonaws.com/dev/job/response_data/${_id}`
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
                    url     : `https://37m3ie0ju8.execute-api.us-east-1.amazonaws.com/dev/job/response_data/${jobDataResponse._id}`,
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
