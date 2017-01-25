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
        return this.$q.when();

        // let promise = this.$q((resolve, reject) => {
        //     this
        //         .db
        //         .get(jobDataResponse._id)
        //         .then((doc) => {
        //             jobDataResponse._rev = doc._rev;

        //             let putById
        //                  = this
        //                     .db
        //                     .put(jobDataResponse);

        //             return putById;
        //         })
        //         .then((result) => {
        //             resolve(result);
        //         })
        //         .catch((err) => {
        //             reject(err);
        //         });
        // });

        // return promise;
    }
}

export default JobDataResponseService;
