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
}

export default JobDataHomePerformanceService;
