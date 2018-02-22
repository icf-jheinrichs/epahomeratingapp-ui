class NavbarAdminController {
    constructor ($rootScope, $state, AuthorizationService, ScrollService, UI_ENUMS) {
        'ngInject';

        this.$rootScope            = $rootScope;
        this.$state                = $state;
        this.AuthorizationService  = AuthorizationService;

        this.MESSAGING             = UI_ENUMS.MESSAGING;
        this.STATE_NAME            = UI_ENUMS.STATE_NAME;

        this.navVisibility = {
            jobs            : false,
            templateLibrary : false,
            jobsProvider    : false,
            users           : false
        };
    }

    //TODO - move to authorization service
    stateIsAuthorized (stateName) {
        let isAuthorized = false;

        switch (stateName) {
        case this.STATE_NAME.JOBS :
            isAuthorized = this.organizationTypes.RaterOrg;
            break;
        case this.STATE_NAME.TEMPLATE_LIBRARY :
            isAuthorized = this.organizationTypes.RaterOrg;
            break;
        case this.STATE_NAME.JOBS_PROVIDER :
            isAuthorized = this.organizationTypes.ProviderOrg;
            break;
        case this.STATE_NAME.USERS :
            isAuthorized = this.userRole.Admin || this.userRole.Provider;
            break;
        }

        return isAuthorized;
    }

    setNavVisibility () {
        this.userRole          = this.AuthorizationService.getUserRole();
        this.organizationTypes = this.AuthorizationService.getOrganizationTypes();

        this.navVisibility = {
            jobs            : this.organizationTypes.RaterOrg,
            templateLibrary : this.organizationTypes.RaterOrg,
            jobsProvider    : this.organizationTypes.ProviderOrg,
            users           : this.userRole.Admin || this.userRole.Provider
        };
    }

    $onInit () {
        this.setNavVisibility();

        this.userAuthorizationUpdateListener
             = this
                .$rootScope
                .$on(this.MESSAGING.USER_AUTHORIZATION_UPDATE, () => {
                    this.setNavVisibility();
                });
    }

    $onDestroy () {
        this.userAuthorizationUpdateListener();
    }
}

export default NavbarAdminController;
