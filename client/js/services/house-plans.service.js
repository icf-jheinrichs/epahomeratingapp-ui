/**
 * HousePlansService is the interface for all job data.
 */
class HousePlansService {
    /**
     * Instantiate HousePlansService with necessary providers.
     *
     * @param  {function} $q        angular.$q promise providers
     * @param  {function} $http     angular.$http ajax requests
     * @param  {object} DB          epahomeratingapp constants - contains paths to databases
     */
    constructor ($q, $http, API_URL) {
        'ngInject';

        this.$q      = $q;
        this.$http   = $http;

        this.API_URL = API_URL;
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
                    url     : this.API_URL.HOUSE_PLAN
                })
                .then((response) => {
                    if (response.status === 200) {
                        resolve(response.data);
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
     * Get house plan by id.
     *
     * @param  {string} _id     UID of house plan
     * @return {promise}        resolves to
     */
    getById (_id) {
        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${this.API_URL.HOUSE_PLAN}/${_id}`
                })
                .then((response) => {
                    if (response.status === 200) {
                        resolve(response.data);
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
     * Get a new job data object.
     *
     * @return {object} default job object.
     */
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

    /**
     * Update houseplan
     * @param  {object} housePlan housePlan update to push to microservice
     * @return {promise}          promise that resolves to success object or rejects on error.
     */
    put (housePlan) {
        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'PUT',
                    url     : `${this.API_URL.HOUSE_PLAN}/${housePlan._id}`,
                    data    : housePlan
                })
                .then((response) => {
                    if (response.status === 200) {
                        resolve(response.data);
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

    post (formData) {
        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method           : 'POST',
                    transformRequest : angular.identity,
                    url              : this.API_URL.HOUSE_PLAN,
                    headers          : {
                        'Content-Type' : undefined
                    },
                    data : formData
                })
                .then((response) => {
                    if (response.status === 200) {
                        resolve(response.data);
                    } else {
                        //TODO: make this less bad
                        reject({
                            message : response.error.message,
                            reason  : response.error.error
                        });
                    }
                })
                .catch((error) => {
                    reject({
                        message : error.data.error.message,
                        reason  : error.data.error.error
                    });
                });
        });

        return promise;
    }

    downloadRemXml (housePlan) {
        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${this.API_URL.HOUSE_PLAN}/rem_xml/${housePlan._id}`
                })
                .then((response) => {
                    if (response.status === 200) {
                        resolve(response.data.data.data.url);
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

    delete (housePlan) {
        let promise = this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'DELETE',
                    url     : `${this.API_URL.HOUSE_PLAN}/${housePlan._id}`
                })
                .then((response) => {
                    if (response.status === 200) {
                        resolve(response.data);
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
}

export default HousePlansService;
