class epahomeratingappController {
    constructor ($rootScope, $state, $stateParams, $timeout, $transitions, AnalyticsService, AuthenticationService, AuthorizationService, DisplayLogicDigestService, UI_ENUMS) {
        'ngInject';

        this.$rootScope   = $rootScope;
        this.$state       = $state;
        this.$stateParams = $stateParams;
        this.$timeout     = $timeout;
        this.$transitions = $transitions;

        this.AnalyticsService          = AnalyticsService;
        this.AuthenticationService     = AuthenticationService;
        this.AuthorizationService      = AuthorizationService;
        this.DisplayLogicDigestService = DisplayLogicDigestService;
        this.MESSAGING                 = UI_ENUMS.MESSAGING;
        this.STATE_NAME                = UI_ENUMS.STATE_NAME;
        this.JOB_STATUS                = UI_ENUMS.JOB_STATUS;

        this.paddingTop    = `${45}px`;
        this.paddingBottom = '45px';
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
        this.transistionSuccessListener
            = this
                .$transitions
                .onSuccess({}, (transition) => {
                    this
                        .AnalyticsService
                        .trackPageView(transition.router.urlRouter.location);
                });

        this.topPadListener = this.$rootScope.$on(this.MESSAGING.SET_TOP_PAD, (event, topPad) => {
            this.$timeout(() => {
                this.paddingTop = `${topPad}px`;
            });

            return topPad;
        });

        this.bottomPadListener = this.$rootScope.$on(this.MESSAGING.SET_BOTTOM_PAD, (event, bottomPad) => {
            this.$timeout(() => {
                this.paddingBottom = `${bottomPad + 45}px`;
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
                        .go(this.STATE_NAME.LOGIN);
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
                            if (authorizedRedirect === this.STATE_NAME.JOBS_SEARCH) {
                                this
                                    .$state
                                    .go(authorizedRedirect, {'status' : 'Active'});
                            } else if (authorizedRedirect === this.STATE_NAME.JOBS_PROVIDER_SEARCH) {
                                this
                                    .$state
                                    .go(authorizedRedirect, {'status' : 'Submitted to Provider'});
                            } else {
                                this
                                    .$state
                                    .go(authorizedRedirect);
                            }
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
