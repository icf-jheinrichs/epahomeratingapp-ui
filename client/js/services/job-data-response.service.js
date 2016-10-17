import PouchDB from 'pouchdb';

class JobDataResponseService {
    constructor ($q, DB) {
        'ngInject';

        this.$q    = $q;

        this.db    = new PouchDB(DB.JOB_DATA_RESPONSE);
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

    put (jobDataResponse) {
        let deferred = this.$q.defer();
        let self = this;

        self
            .db
            .get(jobDataResponse._id)
            .then(function handleGetById (doc) {
                jobDataResponse._rev = doc._rev;

                let putById
                     = self
                        .db
                        .put(jobDataResponse);

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

export default JobDataResponseService;
