import PouchDB from 'pouchdb';

class JobDataHomePerformanceService {
    constructor ($q, DB) {
        'ngInject';

        this.$q    = $q;

        this.db    = new PouchDB(DB.JOB_DATA_HOME_PERFORMANCE);
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

    put (jobDataHomePerformance) {
        let promise = this.$q((resolve, reject) => {
            this
                .db
                .get(jobDataHomePerformance._id)
                .then((doc) => {
                    jobDataHomePerformance._rev = doc._rev;

                    let putById
                         = this
                            .db
                            .put(jobDataHomePerformance);

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

export default JobDataHomePerformanceService;
