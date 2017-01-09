import PouchDB from 'pouchdb';

class JobDataResponseService {
    constructor ($q, DB) {
        'ngInject';

        this.$q    = $q;

        this.db    = new PouchDB(DB.JOB_DATA_RESPONSE);
    }

    getById (_id) {
        let promise = this.$q((resolve, reject) => {
            this
                .db
                .get(_id)
                .then((doc) => {
                    resolve(doc);
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
                .db
                .get(jobDataResponse._id)
                .then((doc) => {
                    jobDataResponse._rev = doc._rev;

                    let putById
                         = this
                            .db
                            .put(jobDataResponse);

                    return putById;
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
