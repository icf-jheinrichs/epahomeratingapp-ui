const API_GATEWAY = 'https://37m3ie0ju8.execute-api.us-east-1.amazonaws.com/dev';

class JobDataHomePerformanceService {
    constructor ($q, $http, DB) {
        'ngInject';

        this.$q    = $q;
        this.$http = $http;
    }

    getById (jobId, houseId) {
        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${API_GATEWAY}/job/home_performance_data/${jobId}/${houseId}`
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

    put (jobDataHomePerformance) {
        let jobId   = jobDataHomePerformance._id.split(':')[0];
        let houseId = jobDataHomePerformance._id.split(':')[1];

        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'PUT',
                    url     : `${API_GATEWAY}/job/home_performance_data/${jobId}/${houseId}`,
                    data    : jobDataHomePerformance
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

export default JobDataHomePerformanceService;
