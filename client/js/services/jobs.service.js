import PouchDB from 'pouchdb';
import _ from 'lodash';

class JobsService {
    constructor ($q, $log, DB) {
        'ngInject';

        this.$q    = $q;
        this.$log  = $log;

        this.db    = new PouchDB(DB.JOB);
    }

    get () {
        let deferred = this.$q.defer();

        this
            .db
            .allDocs({
                include_docs : true
            })
            .then(function handleGet (allDocs) {
                let jobs = {};

                jobs.data = _.map(allDocs.rows, 'doc');

                deferred.resolve(jobs);
            });

        return deferred.promise;
    }

    getById (_id) {
        let deferred = this.$q.defer();

        this
            .db
            .get(_id)
            .then(function handleGetById (doc) {
                let job = {};

                job.data = doc;

                deferred.resolve(job);
            });

        return deferred.promise;
    }

    put (job) {
        let deferred = this.$q.defer();
        let self = this;

        self
            .db
            .get(job._id)
            .then(function handleGetById (doc) {
                job._rev = doc._rev;

                let putById
                     = self
                        .db
                        .put(job);

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

export default JobsService;
