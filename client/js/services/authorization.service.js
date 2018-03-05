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
        this.STATE_NAME         = UI_ENUMS.STATE_NAME;

        this.authorizeLocalUser();
    }

    authorizeLocalUser () {
        const sessionItem = window.sessionStorage.getItem(USER_SESSION_ITEM);
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

        this
            .$rootScope
            .$emit(this.MESSAGING.USER_AUTHORIZATION_UPDATE, false);
    }

    getUserRole () {
        const defaultRoles = {
            Admin    : false,
            Rater    : false,
            Provider : false
        };
        const userCompanyIndex = _findIndex(this.user.userCompany, {O_ID : this.currentOrganization});
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
        const userCompany = _find(this.companies, {O_ID : this.currentOrganization});
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
        window
            .sessionStorage
            .setItem(
                USER_SESSION_ITEM,
                angular.toJson({
                    user                : this.user,
                    companies           : this.companies,
                    currentOrganization : this.currentOrganization
                })
            );
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
                    this.clearState();
                })
                .finally(() => {
                    this
                        .$rootScope
                        .$emit(this.MESSAGING.USER_AUTHORIZATION_UPDATE, false);
                });
        });
    }

    setCurrentOrganization (O_ID) {
        this.currentOrganization = O_ID;
        this.saveSessionStorage();

        this
            .$rootScope
            .$emit(this.MESSAGING.USER_AUTHORIZATION_UPDATE, true);
    }

    userIsAuthorizedForRoute (route) {
        const orgTypes = this.getOrganizationTypes();
        const userRole = this.getUserRole();

        let transitionTo = route;

        if (typeof route === 'object' && route.name) {
            transitionTo = route.name;
        }

        switch (transitionTo) {
        case this.STATE_NAME.DIAGNOSTICS :
            return true;
        case this.STATE_NAME.LOGIN :
            return true;
        case this.STATE_NAME.NOT_AUTHORIZED :
            return true;
        case this.STATE_NAME.REGISTER :
            return true;
        case this.STATE_NAME.PROGRESS :
            return false;
        case this.STATE_NAME.TEMPLATE_LIBRARY :
            return orgTypes.RaterOrg;
        case this.STATE_NAME.TEMPLATE_LIBRARY_NEW :
            return orgTypes.RaterOrg;
        case this.STATE_NAME.TEMPLATE_LIBRARY_EDIT :
            return orgTypes.RaterOrg;
        case this.STATE_NAME.TEMPLATE_LIBRARY_EDIT_BULK :
            return orgTypes.RaterOrg;
        case this.STATE_NAME.TEMPLATE_LIBRARY_SEARCH :
            return orgTypes.RaterOrg;
        case this.STATE_NAME.TEMPLATE_LIBRARY_SEARCH_NEW :
            return orgTypes.RaterOrg;
        case this.STATE_NAME.TEMPLATE_LIBRARY_SEARCH_EDIT :
            return orgTypes.RaterOrg;
        case this.STATE_NAME.TEMPLATE_LIBRARY_SEARCH_EDIT_BULK :
            return orgTypes.RaterOrg;
        case this.STATE_NAME.JOBS :
            return orgTypes.RaterOrg;
        case this.STATE_NAME.JOBS_SEARCH :
            return orgTypes.RaterOrg;
        case this.STATE_NAME.JOBS_PROVIDER :
            return orgTypes.ProviderOrg;
        case this.STATE_NAME.JOBS_PROVIDER_SEARCH :
            return orgTypes.ProviderOrg;
        case this.STATE_NAME.JOB_NEW :
            return orgTypes.RaterOrg;
        case this.STATE_NAME.JOB_EDIT :
            return orgTypes.RaterOrg;
        case this.STATE_NAME.JOB_CHECKLIST :
            return true;
        case this.STATE_NAME.JOB_CHECKLIST_CATEGORY :
            return true;
        case this.STATE_NAME.JOB_CHECKLIST_STATUS :
            return true;
        case this.STATE_NAME.JOB_CHECKLIST_REVIEW :
            return true;
        case this.STATE_NAME.JOB_CHECKLIST_REVIEW_CATEGORY :
            return true;
        case this.STATE_NAME.PROVIDERS :
            return userRole.Admin || userRole.Provider;
        case this.STATE_NAME.USERS :
            return userRole.Admin || userRole.Provider;
        case this.STATE_NAME.USER_EDIT :
            return userRole.Admin || userRole.Provider;
        case this.STATE_NAME.USER_SETTINGS :
            return userRole.Admin || userRole.Provider;
        default :
            //TODO get a little more confidence around this so I can default to false
            return true;
        }
    }

    getAuthorizedRedirect () {
        let authorizedRedirect = this.STATE_NAME.LOGIN;

        if (this.userIsAuthorizedForRoute(this.STATE_NAME.JOBS)) {
            authorizedRedirect = this.STATE_NAME.JOBS;
        } else if (this.userIsAuthorizedForRoute(this.STATE_NAME.TEMPLATE_LIBRARY)) {
            authorizedRedirect = this.STATE_NAME.TEMPLATE_LIBRARY;
        } else if (this.userIsAuthorizedForRoute(this.STATE_NAME.JOBS_PROVIDER)) {
            authorizedRedirect = this.STATE_NAME.JOBS_PROVIDER;
        } else if (this.userIsAuthorizedForRoute(this.STATE_NAME.USERS)) {
            authorizedRedirect = this.STATE_NAME.USERS;
        }

        return authorizedRedirect;
    }
}

export default AuthorizationService;
