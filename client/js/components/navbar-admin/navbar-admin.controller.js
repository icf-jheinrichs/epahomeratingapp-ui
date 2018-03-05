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
