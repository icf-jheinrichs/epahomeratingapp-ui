class JobDataHomePerformanceService {
    constructor ($q, $http, API_URL) {
        'ngInject';

        this.$q        = $q;
        this.$http     = $http;

        this.API_URL   = API_URL;
    }

    getById (jobId, houseId, ratingCompanyID) {
        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${this.API_URL.JOB_DATA_HOME_PERFORMANCE}/${jobId}/${houseId}`,
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

    put (jobDataHomePerformance) {
        let jobId   = jobDataHomePerformance._id.split(':')[0];
        let houseId = jobDataHomePerformance._id.split(':')[1];

        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'PUT',
                    url     : `${this.API_URL.JOB_DATA_HOME_PERFORMANCE}/${jobId}/${houseId}`,
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
