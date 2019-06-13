import _map from 'lodash/map';
import _filter from 'lodash/filter';

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
        let user;

        return this.$q((resolve, reject) => {
            this
                .requestUser(C_ID)
                .then((userResponse) => {
                    if (userResponse !== undefined) {
                        let userCompanies = [];
                        user = userResponse;

                        user.userCompany.forEach((company) => {
                            userCompanies.push(company.O_ID);
                        });

                        return this.getUserCompanies(userCompanies);
                    } else {
                        reject({message : 'There was an error logging in.'});
                    }
                })
                .then((companies) => {
                    resolve({
                        user,
                        companies
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

    getUserCompanies (O_IDs) {
        let userCompanyRequests = [];

        O_IDs.forEach((O_ID) => {
            userCompanyRequests.push(this.getCompany(O_ID));
        });

        return this.$q.all(userCompanyRequests);
    }

    putCompany (company) {
        return this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'PUT',
                    url     : `${this.API_URL.COMPANY}/${company._id}`,
                    data    : company
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
                    this.$log.error(`[user-company.service.js putCompany] ${JSON.stringify(error)}`);
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
                    this.$log.error(`[user-company.service.js getProviderCompanies] ${JSON.stringify(error)}`);
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

    getAllRatingCompanies () {
        return this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${this.API_URL.COMPANY}`
                })
                .then((response) => {
                    if (response.status === 200) {
                        const ratingCompanies = response.data.data;

                        resolve(_filter(ratingCompanies, {RaterOrg : true}));
                    } else {
                        //TODO: make this less bad
                        this.$log.error(`[user-company.service.js getRatingCompanies] ${JSON.stringify(response)}`);
                        reject('somethings amiss');
                    }
                })
                .catch((error) => {
                    this.$log.error(`[user-company.service.js getRatingCompanies] ${JSON.stringify(error)}`);
                    reject(error);
                });
        });
    }

    requestCompanyUserAuthorizations (userCognitoIds) {
        let userAuthorizations = [];

        userCognitoIds.forEach((userCognitoId) => {
            userAuthorizations.push(this.requestUser(userCognitoId));
        });

        return this.$q.all(userAuthorizations);
    }

    requestCompanyUsers (C_ID, O_ID) {
        return this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${this.API_URL.COMPANY}`
                })
                .then((response) => {
                    if (response.status === 200) {
                        const ratingCompanies = response.data.data;

                        resolve(_filter(ratingCompanies, {RaterOrg : true}));
                    } else {
                        //TODO: make this less bad
                        this.$log.error(`[user-company.service.js getRatingCompanies] ${JSON.stringify(response)}`);
                        reject('somethings amiss');
                    }
                })
                .catch((error) => {
                    this.$log.error(`[user-company.service.js getRatingCompanies] ${JSON.stringify(error)}`);
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
