import _map from 'lodash/map';
import _cloneDeep from 'lodash/cloneDeep';

const API_GATEWAY = 'https://37m3ie0ju8.execute-api.us-east-1.amazonaws.com/dev';

/**
 * JobsService is the interface for all job data.
 */
class JobsService {
    /**
     * Instantiate JobsService with necessary providers.
     *
     * @param  {function} $q        angular.$q promise providers
     * @param  {function} $http     angular.$http ajax requests
     * @param  {object} DB          epahomeratingapp constants - contains paths to databases
     */
    constructor ($q, $http, DB) {
        'ngInject';

        this.$q    = $q;
        this.$http = $http;
    }

    /**
     * Gets list of jobs.
     *
     * @return {promise}    resolves to array of jobs
     */
    get () {
        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${API_GATEWAY}/job`
                })
                // .db
                // .allDocs({
                //     include_docs : true
                // })
                .then((response) => {
                    if (response.status === 200) {
                        let jobs = {};

                        jobs = _map(response.data, 'doc');

                        resolve(jobs);
                    } else {
                        //TODO: make this less bad
                        reject('somethings amiss');
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });

        return promise;
    }

    /**
     * Get job by id.
     *
     * @param  {string} _id     UID of job
     * @return {promise}        resolves to
     */
    getById (_id) {
        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${API_GATEWAY}/job/${_id}`
                })
                .then((response) => {
                    if (response.status === 200) {
                        resolve(response.data);
                    } else {
                        //TODO: handle this all proper like
                        reject('something is amiss');
                    }

                })
                .catch((error) => {
                    reject(error);
                });
        });

        return promise;
    }

    getNewSample () {
        let sampleGuid     = Date.now();
        let sampleTemplate = {
            'HouseId'                    : sampleGuid,
            'BuilderId'                  : '',
            'HousePlanId'                : [],
            'AddressInformation'         : {},
            'Photo'                      : [],
            'HvacDesignReport'           : [],
            'RaterDesignReviewChecklist' : []
        };

        return _cloneDeep(sampleTemplate);
    }

    /**
     * Get a new job data object.
     *
     * @return {object} default job object.
     */
    getNewJob () {
        let jobTemplate = {
            'RatingType'           : 'energy-star',
            'Primary'              : this.getNewSample(),
            'Secondary'            : []
        };

        return _cloneDeep(jobTemplate);
    }

    post (job) {
        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'POST',
                    url     : `${API_GATEWAY}/job`,
                    data    : job
                })
                .then((response) => {
                    if (response.status === 200) {
                        resolve(response);
                    } else {
                        //TODO: make this less bad
                        reject('somethings amiss');
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });

        return promise;
    }

    /**
     * Saves updated job data.
     *
     * @param  {object} job job data
     * @return {promis}     resolves to successful save.
     */
    put (job) {
        return this.$q.when();

        // let promise = this.$q((resolve, reject) => {
        //     this
        //         .db
        //         .get(job._id)
        //         .then((doc) => {
        //             job._rev = doc._rev;

        //             let putById
        //                  = this
        //                     .db
        //                     .put(job);

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

export default JobsService;
