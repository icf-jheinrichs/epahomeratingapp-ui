import _findIndex from 'lodash/findIndex';
import _find from 'lodash/find';

/**
 * Authorization happens after authentication. Distinguishes what user is authorized to do.
 */
const USER_SESSION_ITEM = 'userAuthentication';

class AuthorizationService {
    constructor ($q, $rootScope, UserCompanyService, UI_ENUMS) {
        'ngInject';

        this.$q                 = $q;
        this.$rootScope         = $rootScope;
        this.UserCompanyService = UserCompanyService;
        this.MESSAGING          = UI_ENUMS.MESSAGING;

        this.authorizeLocalUser();
    }

    authorizeLocalUser () {
        let sessionItem = window.sessionStorage.getItem(USER_SESSION_ITEM);
        let localUser;

        if (sessionItem === 'undefined' || sessionItem === null) {
            localUser = undefined;
        } else {
            localUser = angular.fromJson(sessionItem);
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

    getUserMESAData () {
        return this.user.user;
    }

    getUserId () {
        return this.user.user.CognitoId;
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
                })
                .catch(() => {
                    this.clearState;
                })
                .finally(() => {
                    this.$rootScope.$emit(this.MESSAGING.USER_AUTHORIZATION_UPDATE);
                });
        });
    }

    setCurrentOrganization (O_ID) {
        this.currentOrganization = O_ID;
        this.saveSessionStorage();
        this.$rootScope.$emit(this.MESSAGING.USER_AUTHORIZATION_UPDATE);
    }
}

export default AuthorizationService;
