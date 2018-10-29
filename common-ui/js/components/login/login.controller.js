class LoginController {
    constructor ($log, $rootScope, $state, $transitions, $q, AuthenticationService, AuthorizationService, UI_ENUMS, VALIDATION_PATTERN) {
        'ngInject';

        this.$log         = $log;
        this.$rootScope   = $rootScope;
        this.$state       = $state;
        this.$transitions = $transitions;
        this.$q           = $q;

        this.AuthenticationService = AuthenticationService;
        this.AuthorizationService  = AuthorizationService;

        this.userIdPattern = VALIDATION_PATTERN.USER_NAME;
        this.STATE_NAME    = UI_ENUMS.STATE_NAME;
    }

    $onInit () {
        this.user   = {
            'userId'   : '',
            'password' : ''
        };

        this
            .reset();

        this
            .AuthenticationService
            .checkLogin()
            .then((userData) => {
                // no resolve needed. handle success here.
                // resolve(data);
                let userInfo       = angular.fromJson(userData);

                this.user.userId   = userInfo.userId;
                this.user.password = userInfo.password;
                this.isBusy        = true;
                return (this.login(this.user));
            })
            .then((data) => {
                return;
            })
            .catch((error) => {
                this.isBusy = false;
                return;
            });

        this.rootscopeSubscription = this.$transitions.onError({from : 'login'}, (transition) => {
            try {
                this.statusMessage = transition._error.detail.message || 'There was a system error. Please contact RaterPRO support.';
            } catch (error) {
                this.statusMessage = 'There was a system error. Please contact RaterPRO support.';
            }

            this.isBusy        = false;
            this.notAuthorized = true;
            this.AuthorizationService.clearState();
            this.AuthenticationService.logout();
        });
    }

    $onDestroy () {
        this.rootscopeSubscription();
    }

    setAction (action) {
        this.action = action;
    }

    returnToOriginalState () {
        const returnState      = this.AuthenticationService.getReturnState();
        let authorizedRedirect = {
            name   : this.AuthorizationService.getAuthorizedRedirect(),
            params : {
                'status' : 'Active'
            }
        };

        if (Object.keys(returnState).length > 0 && this.AuthorizationService.userIsAuthorizedForRoute(returnState)) {
            authorizedRedirect = returnState;
        }

        this.AuthenticationService.clearReturnState();

        this.isBusy = false;
        this.$state.go(authorizedRedirect.name, authorizedRedirect.params, {reload : true});
    }

    userIsAuthorized (userCompanies) {
        let isUserAuthorized = false;
        let userCompaniesIndex = userCompanies.length - 1;

        while ((userCompaniesIndex + 1) && !isUserAuthorized) {
            let userCompany = userCompanies[userCompaniesIndex];

            if (userCompany.Admin || userCompany.Rater || userCompany.Provider) {
                isUserAuthorized = true;
            }

            userCompaniesIndex -= 1;
        }

        return isUserAuthorized;
    }

    login (user) {
        return this.$q((resolve, reject) => {
            this
                .AuthenticationService
                .login(user)
                .then((user) => {
                    this.notAuthorized = false;
                    this.setAction('authorization');
                    return this.AuthorizationService.setUserAuthorization(user.userId);
                })
                .then((user) => {
                    if (this.userIsAuthorized(user.userCompany)) {
                        this.returnToOriginalState();
                    } else {
                        this.notAuthorized = true;
                        this.statusMessage = 'You are not authorized to use this system.';
                        this.AuthenticationService.logout();
                        reject({status : 'not authorized'});
                    }
                })
                .catch((error) => {
                    this.notAuthorized = true;
                    this.AuthenticationService.logout();
                    reject(error);
                });
        });
    }

    reset () {
        this.notAuthorized = false;
        this.action        = 'login';
        this.isBusy        = false;
        this.statusMessage = '';
    }

    resetPassword (user) {
        return this.$q((resolve, reject) => {
            this
                .AuthenticationService
                .resetPassword(user)
                .then((data) => {
                    resolve('yes');
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

export default LoginController;
