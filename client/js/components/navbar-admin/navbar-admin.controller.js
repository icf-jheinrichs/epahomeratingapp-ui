class NavbarAdminController {
    constructor ($rootScope, $state, AuthenticationService, AuthorizationService, ScrollService, UI_ENUMS) {
        'ngInject';

        this.$rootScope            = $rootScope;
        this.$state                = $state;
        this.AuthenticationService = AuthenticationService;
        this.AuthorizationService  = AuthorizationService;

        this.MESSAGING             = UI_ENUMS.MESSAGING;
        this.STATE_NAME            = UI_ENUMS.STATE_NAME;
    }

    //TODO - move to authorization service
    stateIsAuthorized (stateName) {
        let isAuthorized = false;

        switch (stateName) {
        case this.STATE_NAME.JOBS :
            isAuthorized = this.userRole.Admin || this.userRole.Rater;
            break;
        case this.STATE_NAME.HOUSE_LIBRARY :
            isAuthorized = this.userRole.Admin || this.userRole.Rater;
            break;
        case this.STATE_NAME.JOBS_PROVIDER :
            isAuthorized = this.userRole.Admin || this.userRole.Provider;
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
        } else if (this.stateIsAuthorized(this.STATE_NAME.HOUSE_LIBRARY)) {
            this.$state.go(this.STATE_NAME.HOUSE_LIBRARY);
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

    setUserRole () {
        let currentState = this.$state.current.name;
        this.userRole    = this.AuthorizationService.getUserRole();

        if (!this.stateIsAuthorized(currentState)) {
            this.$state.go(this.getAuthorizedRedirect());
        } else {
            this.$state.transitionTo(this.$state.current, this.$stateParams, {reload : true, inherit : false, notify : true});
        }
    }

    $onInit () {
        this.setUserRole();

        this.$rootScope.$on(this.MESSAGING.USER_AUTHORIZATION_UPDATE, () => {
            this.setUserRole();
        });
    }
}

export default NavbarAdminController;
