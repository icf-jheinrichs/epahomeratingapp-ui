import PouchDB from 'pouchdb';
import _map from 'lodash/map';

class JobsService {
    constructor ($q, DB) {
        'ngInject';

        this.$q    = $q;

        this.db    = new PouchDB(DB.JOB);
    }

    get () {
        let promise = this.$q((resolve, reject) => {
            this
                .db
                .allDocs({
                    include_docs : true
                })
                .then((allDocs) => {
                    let jobs = {};

                    jobs.data = _map(allDocs.rows, 'doc');

                    resolve(jobs);
                });
        });

        return promise;
    }

    getById (_id) {
        let promise = this.$q((resolve, reject) => {
            this
                .db
                .get(_id)
                .then((doc) => {
                    let job = {};

                    job.data = doc;

                    resolve(job);
                });
        });

        return promise;
    }

    getNewJob () {
        let primaryHouseGuid = Date.now();
        let jobTemplate = {
            'RatingType'           : 'energy-star',
            'Primary'              : {
                'HouseId'          : primaryHouseGuid
            },
            'Secondary'            : [],
            'Status'               : 'Active',
            'Progress'             : {
                'PreDrywall' : {
                    'Verified'      : 0,
                    'MustCorrect'   : 0,
                    'Total'         : 0
                },
                'Final' : {
                    'Verified'      : 0,
                    'MustCorrect'   : 0,
                    'Total'         : 0
                }
            },
            'InternalReview'       : false,
            'ReturnedFromInternal' : false,
            'ReturnedFromProvider' : false,
            'History'              : []
        };

        return this.$q.when(jobTemplate);
    }

    put (job) {
        let promise = this.$q((resolve, reject) => {
            this
                .db
                .get(job._id)
                .then((doc) => {
                    job._rev = doc._rev;

                    let putById
                         = this
                            .db
                            .put(job);

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

export default JobsService;
