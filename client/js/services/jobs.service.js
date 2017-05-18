import _map from 'lodash/map';
import _random from 'lodash/random';
import _cloneDeep from 'lodash/cloneDeep';

/**
 * JobsService is the interface for all job data.
 */
class JobsService {
    /**
     * Instantiate JobsService with necessary providers.
     *
     * @param  {function} $q        angular.$q promise providers
     * @param  {function} $http     angular.$http ajax requests
     * @param  {function} $sanitize angular.$sanitize html injection
     * @param  {object}   API_URL   epahomeratingapp constants - contains paths to API
     */
    constructor ($log, $q, $http, $sanitize, API_URL) {
        'ngInject';

        this.$log      = $log;
        this.$q        = $q;
        this.$http     = $http;
        this.$sanitize = $sanitize;

        this.API_URL   = API_URL;
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
                    url     : this.API_URL.JOB
                })
                .then((response) => {
                    if (response.status === 200) {
                        let jobs = {};

                        jobs = _map(response.data, 'doc');
                        jobs.forEach((job) => {
                            job.offlineAvailable = !!_random(0, 1);
                        });

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
                    url     : `${this.API_URL.JOB}/${_id}`
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
            'HousePlan'                  : [],
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
        // @todo consider applying logic for req. fields (if this group is partly filled - return rejection, etc)
        this.job = this.sanitize(job);
        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'POST',
                    url     : this.API_URL.JOB,
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

    getExportSignedUrl (_id) {
        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${this.API_URL.JOB}/rem_xml/${_id}`
                })
                .then((response) => {
                    if (response.status === 200) {
                        resolve(response.data.data.url);
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
        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'PUT',
                    url     : `${this.API_URL.JOB}/${job._id}`,
                    data    : job
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

    makeAvailableOffline (job) {
        this.$log.log(`[jobs.service.js] ${job} make available offline`);
    }

    cancelAvailableOffline (job) {
        this.$log.log(`[jobs.service.js] ${job} cancel available offline`);
    }

    sanitize (job) {
        job.Primary.BuilderId                           = this.$sanitize(job.Primary.BuilderId);
        job.Primary.AddressInformation.Address1         = this.$sanitize(job.Primary.AddressInformation.Address1);
        job.Primary.AddressInformation.CityMunicipality = this.$sanitize(job.Primary.AddressInformation.CityMunicipality);
        job.Primary.AddressInformation.CommunityName    = this.$sanitize(job.Primary.AddressInformation.CommunityName);
        job.Primary.AddressInformation.LotNo            = this.$sanitize(job.Primary.AddressInformation.LotNo);
        job.Primary.AddressInformation.ManualIdentifier = this.$sanitize(job.Primary.AddressInformation.ManualIdentifier);
        job.Primary.AddressInformation.StateCode        = this.$sanitize(job.Primary.AddressInformation.StateCode);
        job.Primary.AddressInformation.ZipCode          = this.$sanitize(job.Primary.AddressInformation.ZipCode);
    }
}

export default JobsService;
