class UserCompanyService {
    constructor ($http, $log, $q, API_URL) {
        'ngInject';

        this.$http          = $http;
        this.$log           = $log;
        this.$q             = $q;

        this.API_URL        = API_URL;
    }

    requestUser (C_ID) {
        return this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${this.API_URL.USER}/${C_ID}`
                })
                .then((response) => {
                    if (response.status === 200) {

                        resolve(response.data.data);
                    } else {
                        //TODO: make this less bad
                        this.$log.error(`[user-company.service.js requestUser] ${JSON.stringify(response)}`);
                        reject('something is amiss');
                    }
                })
                .catch((error) => {
                    this.$log.error(`[user-company.service.js requestUser] ${JSON.stringify(error)}`);
                    reject(error);
                });
        });
    }

    /**
     * Get user data
     * @param  {string} C_ID contact id (from iStar)
     * @return {promise}     promise that resolves with user data
     */
    getUser (C_ID) {
        return this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${this.API_URL.USER}/${C_ID}/companies`
                })
                .then((response) => {
                    resolve({
                        user : {
                            user        : response.data.data.user,
                            userCompany : response.data.data.userCompany
                        },
                        companies : response.data.data.company
                    });
                })
                .catch((error) => {
                    this.$log.error(`[user-company.service.js getUser] ${JSON.stringify(error)}`);
                    reject(error);
                });
        });
    }

    putUserAuthorization (userCompany) {
        return this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'PUT',
                    url     : `${this.API_URL.USER}/${userCompany.C_ID}`,
                    data    : userCompany
                })
                .then((response) => {
                    if (response.status === 200) {
                        resolve('success');
                    } else {
                        //TODO: make this less bad
                        reject('somethings amiss');
                    }
                })
                .catch((error) => {
                    this.$log.error(`[user-company.service.js putUser] ${JSON.stringify(error)}`);
                    reject(error);
                });
        });
    }

    createPendingProviderRaterAssociation (providerCompanyId, raterCompanyId) {
        return this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'POST',
                    url     : `${this.API_URL.COMPANY}/associate/${providerCompanyId}?raterId=${raterCompanyId}`
                })
                .then((response) => {
                    if (response.status === 200) {
                        resolve('success');
                    } else {
                        //TODO: make this less bad
                        reject('somethings amiss');
                    }
                })
                .catch((error) => {
                    this.$log.error(`[user-company.service.js createPendingProviderRaterAssociation] ${JSON.stringify(error)}`);
                    reject(error);
                });
        });
    }

    updatePendingProviderRaterAssociation (providerCompanyId, raterCompanyId, approve) {
        return this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'PUT',
                    url     : `${this.API_URL.COMPANY}/associate/${providerCompanyId}?raterId=${raterCompanyId}&approve=${approve}`
                })
                .then((response) => {
                    if (response.status === 200) {
                        resolve('success');
                    } else {
                        //TODO: make this less bad
                        this.$log.error(`[user-company.service.js updatePendingProviderRaterAssociation] ${JSON.stringify(response)}`);
                        reject('somethings amiss');
                    }
                })
                .catch((error) => {
                    this.$log.error(`[user-company.service.js updatePendingProviderRaterAssociation] ${JSON.stringify(error)}`);
                    reject(error);
                });
        });
    }

    removeProviderRaterAssociation (providerCompanyId, raterCompanyId) {
        return this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'DELETE',
                    url     : `${this.API_URL.COMPANY}/associate/${providerCompanyId}?raterId=${raterCompanyId}`
                })
                .then((response) => {
                    if (response.status === 200) {
                        resolve('success');
                    } else {
                        //TODO: make this less bad
                        this.$log.error(`[user-company.service.js removeProviderRaterAssociation] ${JSON.stringify(response)}`);
                        reject('somethings amiss');
                    }
                })
                .catch((error) => {
                    this.$log.error(`[user-company.service.js removeProviderRaterAssociation] ${JSON.stringify(error)}`);
                    reject(error);
                });
        });
    }

    /**
     * get company data
     * @param  {string} O_ID organization ID (from iStar)
     * @return {promise}     promise that resolves with company data
     */
    getCompany (O_ID) {
        return this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${this.API_URL.COMPANY}/${O_ID}`
                })
                .then((response) => {
                    if (response.status === 200) {
                        resolve(response.data.data);
                    } else {
                        //TODO: make this less bad
                        this.$log.error(`[user-company.service.js getCompany] ${JSON.stringify(response)}`);
                        reject('somethings amiss');
                    }
                })
                .catch((error) => {
                    this.$log.error(`[user-company.service.js getCompany] ${JSON.stringify(error)}`);
                    reject(error);
                });
        });
    }

    getAllProviderCompanies () {
        return this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${this.API_URL.COMPANY}/providers`
                })
                .then((response) => {
                    resolve(response.data.data);
                })
                .catch((error) => {
                    this.$log.error(`[user-company.service.js getAllProviderCompanies] ${JSON.stringify(error)}`);
                    reject(error);
                });
        });
    }

    getAllRatingCompanies () {
        return this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${this.API_URL.COMPANY}/raters`
                })
                .then((response) => {
                    resolve(response.data.data);
                })
                .catch((error) => {
                    this.$log.error(`[user-company.service.js getAllRatingCompanies] ${JSON.stringify(error)}`);
                    reject(error);
                });
        });
    }

    getRelatedProviderCompanies (raterId) {
        return this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${this.API_URL.COMPANY}/${raterId}/providers`
                })
                .then((response) => {
                    resolve(response.data.data);
                })
                .catch((error) => {
                    this.$log.error(`[user-company.service.js getProviderCompanies] ${JSON.stringify(error)}`);
                    reject(error);
                });
        });
    }

    getRelatedRatingCompanies (providerId) {
        return this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${this.API_URL.COMPANY}/${providerId}/raters`
                })
                .then((response) => {
                    resolve(response.data.data);
                })
                .catch((error) => {
                    this.$log.error(`[user-company.service.js getProviderCompanies] ${JSON.stringify(error)}`);
                    reject(error);
                });
        });
    }

    getCompanyUsers (O_ID) {
        return this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${this.API_URL.COMPANY}/${O_ID}/users`
                })
                .then((response) => {
                    if (response.status === 200) {
                        resolve(response.data.data);
                    } else {
                        //TODO: make this less bad
                        this.$log.error(`[user-company.service.js getCompanyUsers] ${JSON.stringify(response)}`);
                        reject('somethings amiss');
                    }
                })
                .catch((error) => {
                    this.$log.error(`[user-company.service.js getCompanyUsers] ${JSON.stringify(error)}`);
                    reject(error);
                });
        });
    }
}

export default UserCompanyService;
