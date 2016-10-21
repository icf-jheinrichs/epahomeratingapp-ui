import PouchDB from 'pouchdb';

class JobDataHomePerformanceService {
    constructor ($q, DB) {
        'ngInject';

        this.$q    = $q;

        this.db    = new PouchDB(DB.JOB_DATA_HOME_PERFORMANCE);
    }

    getById (_id) {
        let deferred = this.$q.defer();

        this
            .db
            .get(_id)
            .then(function handleGet (doc) {
                deferred.resolve(doc);
            })
            .catch(function handleError (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    put (jobDataHomePerformance) {
        let deferred = this.$q.defer();
        let self = this;

        self
            .db
            .get(jobDataHomePerformance._id)
            .then(function handleGetById (doc) {
                jobDataHomePerformance._rev = doc._rev;

                let putById
                     = self
                        .db
                        .put(jobDataHomePerformance);

                return putById;
            })
            .then(function handlePut (result) {
                deferred.resolve(result);
            })
            .catch(function handlePutError (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }
}

export default JobDataHomePerformanceService;
