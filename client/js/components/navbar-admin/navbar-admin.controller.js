class NavbarAdminController {
    constructor ($rootScope, $state, AuthenticationService, AuthorizationService, ScrollService, UI_ENUMS) {
        'ngInject';

        this.$rootScope            = $rootScope;
        this.$state                = $state;
        this.AuthenticationService = AuthenticationService;
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

    getAuthorizedRedirect () {
        let currentState;

        if (this.stateIsAuthorized(this.STATE_NAME.JOBS)) {
            this.$state.go(this.STATE_NAME.JOBS);
        } else if (this.stateIsAuthorized(this.STATE_NAME.TEMPLATE_LIBRARY)) {
            this.$state.go(this.STATE_NAME.TEMPLATE_LIBRARY);
        } else if (this.stateIsAuthorized(this.STATE_NAME.JOBS_PROVIDER)) {
            this.$state.go(this.STATE_NAME.JOBS_PROVIDER);
        } else if (this.stateIsAuthorized(this.STATE_NAME.USERS)) {
            this.$state.go(this.STATE_NAME.USERS);
        } else {
            this
                .AuthorizationService
                .clearState();

            this
                .AuthenticationService
                .logout()
                .then(() => {
                    this
                        .$state
                        .go(this.STATE_NAME.LOGIN);
                });
        }

        return currentState;
    }

    setNavVisibility () {
        this.navVisibility = {
            jobs            : this.organizationTypes.RaterOrg,
            templateLibrary : this.organizationTypes.RaterOrg,
            jobsProvider    : this.organizationTypes.ProviderOrg,
            users           : this.userRole.Admin || this.userRole.Provider
        };
    }

    setUserRole () {
        const currentState     = this.$state.current.name;
        this.userRole          = this.AuthorizationService.getUserRole();
        this.organizationTypes = this.AuthorizationService.getOrganizationTypes();

        this.setNavVisibility();

        if (!this.stateIsAuthorized(currentState)) {
            this
                .$state
                .go(this.getAuthorizedRedirect());
        } else {
            this
                .$state
                .transitionTo(
                    this.$state.current,
                    this.$stateParams,
                    {reload : true, inherit : false, notify : true}
                );
        }
    }

    $onInit () {
        this.setUserRole();

        this
            .$rootScope
            .$on(this.MESSAGING.USER_AUTHORIZATION_UPDATE, () => {
                this.setUserRole();
            });
    }
}

export default NavbarAdminController;
