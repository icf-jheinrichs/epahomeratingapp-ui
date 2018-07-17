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

    //TODO: get this to work again.
    returnToOriginalState () {
        const authorizedRedirect = this.AuthorizationService.getAuthorizedRedirect();
        // let state   = this.returnTo.state();
        // let params  = this.returnTo.params();
        // let options = Object.assign({}, this.returnTo.options(), {reload : true});

        // default to active jobs
        let searchParams = {
            'status' : 'Active'
        };

        this.isBusy = false;
        this.$state.go(authorizedRedirect, searchParams, {reload : true});
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
                    this.setAction('authorization');
                    return this.AuthorizationService.setUserAuthorization(user.userId);
                })
                .then((user) => {
                    if (this.userIsAuthorized(user.userCompany)) {
                        this.returnToOriginalState();
                    } else {
                        this.notAuthorized = true;
                        reject({status : 'not authorized'});
                    }
                })
                .catch((err) => {
                    this.notAuthorized = true;
                    this.AuthenticationService.logout();
                    reject(err);
                });
        });
    }

    reset () {
        this.notAuthorized = false;
        this.action = 'login';
        this.isBusy = false;
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
