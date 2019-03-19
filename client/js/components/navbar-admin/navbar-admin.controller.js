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
        this.navVisibility = {
            jobs            : this.AuthorizationService.userIsAuthorizedForRoute(this.STATE_NAME.JOBS_SEARCH),
            templateLibrary : this.AuthorizationService.userIsAuthorizedForRoute(this.STATE_NAME.TEMPLATE_LIBRARY),
            jobsProvider    : this.AuthorizationService.userIsAuthorizedForRoute(this.STATE_NAME.JOBS_PROVIDER_SEARCH),
            users           : this.AuthorizationService.userIsAuthorizedForRoute(this.STATE_NAME.USERS)
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
