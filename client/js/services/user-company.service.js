import _map from 'lodash/map';
import _filter from 'lodash/filter';

class UserCompanyService {
    constructor ($http, $log, $q, UI_ENUMS, API_URL) {
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
                        reject('somethings amiss');
                    }
                })
                .catch((error) => {
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
                    let userCompanies = [];
                    user = userResponse;

                    user.userCompany.forEach((company) => {
                        userCompanies.push(company.O_ID);
                    });

                    return this.getUserCompanies(userCompanies);
                })
                .then((companies) => {
                    resolve({
                        user,
                        companies
                    });
                });
        });
    }

    /**
     * Get user data
     * @param  {string} C_ID contact id (from iStar)
     * @return {promise}     promise that resolves with user data
     */
    getNewUser (C_ID) {
        return this.$q((resolve, reject) => {
            resolve({
                userName : 'joe@username.com'
            });
        });
    }

    putUser (user) {
        return this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'PUT',
                    url     : `${this.API_URL.USER}/${user.user._id}`,
                    data    : user
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
                        reject('somethings amiss');
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getProviderCompanies () {
        return this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${this.API_URL.COMPANY}`
                })
                .then((response) => {
                    if (response.status === 200) {
                        let providers = response.data.data;

                        resolve(_filter(providers, {ProviderOrg : true}));
                    } else {
                        //TODO: make this less bad
                        reject('somethings amiss');
                    }
                })
                .catch((error) => {
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
                    url     : `${this.API_URL.USER}/?userId=${C_ID}&companyId=${O_ID}`
                })
                .then((response) => {
                    if (response.status === 200) {

                        resolve(response.data.data);
                    } else {
                        //TODO: make this less bad
                        reject('somethings amiss');
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getCompanyUsers (C_ID, O_ID) {
        return this.$q((resolve, reject) => {
            this
                .$http({
                    method  : 'GET',
                    url     : `${this.API_URL.USER}/?userId=${C_ID}&companyId=${O_ID}`
                })
                .then((response) => {
                    if (response.status === 200) {
                        let userCognitoIds = _map(response.data.data, 'CognitoId');

                        return this.requestCompanyUserAuthorizations(userCognitoIds);
                    } else {
                        //TODO: make this less bad
                        reject('somethings amiss');
                    }
                })
                .then((companyUserAuthorizations) => {
                    resolve(companyUserAuthorizations);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

export default UserCompanyService;
