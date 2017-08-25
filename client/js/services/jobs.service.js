import _cloneDeep from 'lodash/cloneDeep';
// import _map from 'lodash/map';
// import _random from 'lodash/random';
// import _sample from 'lodash/sample';

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
    constructor ($log, $q, $http, $interval, $rootScope, $sanitize, API_URL, UI_ENUMS) {
        'ngInject';
        // let self = this;

        this.$log       = $log;
        this.$q         = $q;
        this.$http      = $http;
        this.$sanitize  = $sanitize;
        this.$interval  = $interval;
        this.$rootScope = $rootScope;

        this.API_URL   = API_URL;

        this.MESSAGING = UI_ENUMS.MESSAGING;

        // this.messages = [this.MESSAGING.DEVICE_OFFLINE, this.MESSAGING.DEVICE_ONLINE, this.MESSAGING.ASSET_DOWNLOADED, this.MESSAGING.ASSET_UPLOADED_FOR_JOB, this.MESSAGING.ASSET_BEING_UPLOADED_FOR_JOB, this.MESSAGING.DB_START_SYNC, this.MESSAGING.DB_PAUSE_SYNC];
        // this.jobIDs   = ['1ef1c7dce98910b013b2dbc5272f57cf', '27be11354609526b241e1fa83080ac27', '2b7fef4727c30a3e29c46f84d3bfc73e', '4224198713186c7bf015b08bb8b7969b', '498915e4edeb9eb2c70ae554c1bc8553', '6c44b076d4a80b35f42a5c3e82f9a95d', '932876091b531e106a2ced4251f358bc', 'cf6e338f0f7b9851b306cb4da9c04fef'];

        this.messages = [this.MESSAGING.DEVICE_ONLINE, this.MESSAGING.ASSET_DOWNLOADED];
        this.jobIDs   = ['1ef1c7dce98910b013b2dbc5272f57cf', '27be11354609526b241e1fa83080ac27', '2b7fef4727c30a3e29c46f84d3bfc73e', '4224198713186c7bf015b08bb8b7969b', '498915e4edeb9eb2c70ae554c1bc8553', '6c44b076d4a80b35f42a5c3e82f9a95d', '932876091b531e106a2ced4251f358bc', 'cf6e338f0f7b9851b306cb4da9c04fef'];

        this.messageIndex = 0;
        this.jobIDindex   = 0;

        // this.stop = this.$interval(() => {
        //     let message = _sample(self.messages);
        //     let jobID   = _sample(self.jobIDs);

        //     let data = {
        //         jobID,
        //         assetStatus : {
        //             total   : 4,
        //             missing : _random(0, 1)
        //         },
        //         uploadingJobs : ['1ef1c7dce98910b013b2dbc5272f57cf', '27be11354609526b241e1fa83080ac27', '2b7fef4727c30a3e29c46f84d3bfc73e', '4224198713186c7bf015b08bb8b7969b', '498915e4edeb9eb2c70ae554c1bc8553']
        //     };

        //     self.$log.log(message, jobID);

        //     self.$rootScope.$broadcast(message, data);

        // }, 5000);
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

                        jobs = response.data;
                        jobs.forEach((job) => {
                            job.offlineAvailable = true; // !!_random(0, 1);
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
