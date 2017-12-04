import _findIndex from 'lodash/findIndex';
import _find from 'lodash/find';

/**
 * Authorization happens after authentication. Distinguishes what user is authorized to do.
 */
const USER_SESSION_ITEM = 'userAuthentication';

class AuthorizationService {
    constructor ($q, UserCompanyService) {
        'ngInject';

        this.$q                 = $q;
        this.UserCompanyService = UserCompanyService;

        this.authorizeLocalUser();
    }

    authorizeLocalUser () {
        let sessionItem = window.sessionStorage.getItem(USER_SESSION_ITEM);
        let localUser;

        if (sessionItem !== 'undefined') {
            localUser = angular.fromJson(sessionItem);
        } else {
            localUser = undefined;
        }

        if (localUser === undefined) {
            this.clearState();
        } else {
            this.user                = localUser.user;
            this.companies           = localUser.companies;
            this.currentOrganization = localUser.currentOrganization;
        }
    }

    clearState () {
        this.user                = {};
        this.companies           = [];
        this.currentOrganization = undefined;
        window.sessionStorage.setItem(USER_SESSION_ITEM, undefined);
    }

    getUserRole () {
        const defaultRoles = {
            Admin    : false,
            Rater    : false,
            Provider : false
        };
        let userCompanyIndex = _findIndex(this.user.userCompany, {O_ID : this.currentOrganization});
        let userRoles = {};

        if (userCompanyIndex >= 0) {
            userRoles = {
                Admin    : this.user.userCompany[userCompanyIndex].Admin,
                Rater    : this.user.userCompany[userCompanyIndex].Rater,
                Provider : this.user.userCompany[userCompanyIndex].Provider
            };
        }

        return Object.assign({}, defaultRoles, userRoles);
    }

    getOrganizationTypes () {
        let userCompany = _find(this.companies, {O_ID : this.currentOrganization});
        let orgTypes;

        if (userCompany) {
            orgTypes = {
                RaterOrg    : userCompany.RaterOrg,
                ProviderOrg : userCompany.ProviderOrg
            };
        } else {
            orgTypes = {
                RaterOrg    : false,
                ProviderOrg : false
            };
        }

        return orgTypes;
    }

    getUserCompanies () {
        return this.companies;
    }

    getCurrentOrganizationId () {
        return this.currentOrganization;
    }

    getUserId () {
        return this.user.CognitoId;
    }

    saveSessionStorage () {
        window.sessionStorage.setItem(USER_SESSION_ITEM, angular.toJson({
            user                : this.user,
            companies           : this.companies,
            currentOrganization : this.currentOrganization
        }));
    }

    setUserAuthorization (userId) {
        return this.$q((resolve, reject) => {
            this
                .UserCompanyService
                .getUser(userId)
                .then((user) => {
                    this.user                = user.user;
                    this.companies           = user.companies;
                    this.currentOrganization = this.companies[0].O_ID;

                    this.saveSessionStorage();

                    resolve(this.user);
                });
        });
    }

    setCurrentOrganization (O_ID) {
        this.currentOrganization = O_ID;
        this.saveSessionStorage();
    }
}

export default AuthorizationService;
