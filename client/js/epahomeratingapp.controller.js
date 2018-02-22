class epahomeratingappController {
    constructor ($timeout, $rootScope, $state, $stateParams, AuthenticationService, AuthorizationService, DisplayLogicDigestService, UI_ENUMS) {
        'ngInject';

        this.$timeout     = $timeout;
        this.$rootScope   = $rootScope;
        this.$state       = $state;
        this.$stateParams = $stateParams;

        this.AuthenticationService     = AuthenticationService;
        this.AuthorizationService      = AuthorizationService;
        this.DisplayLogicDigestService = DisplayLogicDigestService;
        this.MESSAGING                 = UI_ENUMS.MESSAGING;
        this.STATE_NAME                = UI_ENUMS.STATE_NAME;

        this.paddingTop    = `${45}px`;
        this.paddingBottom = '0px';
    }

    stateIsJobChecklist (route) {
        const checklistRoutes = [
            this.STATE_NAME.JOB_CHECKLIST,
            this.STATE_NAME.JOB_CHECKLIST_CATEGORY,
            this.STATE_NAME.JOB_CHECKLIST_STATUS,
            this.STATE_NAME.JOB_CHECKLIST_REVIEW,
            this.STATE_NAME.JOB_CHECKLIST_REVIEW_CATEGORY
        ];

        return checklistRoutes.indexOf(route) >= 0;
    }

    $onInit () {
        this.topPadListener = this.$rootScope.$on(this.MESSAGING.SET_TOP_PAD, (event, topPad) => {
            this.$timeout(() => {
                this.paddingTop = `${topPad}px`;
            });

            return topPad;
        });

        this.bottomPadListener = this.$rootScope.$on(this.MESSAGING.SET_BOTTOM_PAD, (event, bottomPad) => {
            this.$timeout(() => {
                this.paddingBottom = `${bottomPad}px`;
            });

            return bottomPad;
        });

        this.invalidjwtListener = this.$rootScope.$on(this.MESSAGING.INVALID_JWT, (event, bottomPad) => {
            this
                .AuthorizationService
                .clearState();

            this
                .AuthenticationService
                .logout()
                .then(() => {
                    this
                        .$state
                        .go('login');
                });
        });

        this.userAuthorizationUpdateListener
             = this
                .$rootScope
                .$on(this.MESSAGING.USER_AUTHORIZATION_UPDATE, (event, needsRedirect) => {
                    const currentState = this.$state.current.name;

                    if (!needsRedirect) {
                        return;
                    }

                    if (!this.AuthorizationService.userIsAuthorizedForRoute(currentState) || this.stateIsJobChecklist(currentState)) {
                        const authorizedRedirect = this.AuthorizationService.getAuthorizedRedirect();

                        if (authorizedRedirect !== this.STATE_NAME.LOGIN) {
                            this
                                .$state
                                .go(authorizedRedirect);
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
                    } else {
                        this
                            .$state
                            .transitionTo(
                                this.$state.current,
                                this.$stateParams,
                                {reload : true, inherit : false, notify : true}
                            );
                    }
                });
    }

    $onDestroy () {
        this.topPadListener();
        this.bottomPadListener();
        this.invalidjwtListener();
        this.userAuthorizationUpdateListener();
    }
}

export default epahomeratingappController;
