class LoginController {
    constructor ($state, $q, $log, AuthenticationService, AuthorizationService, UI_ENUMS) {
        'ngInject';

        this.userIdPattern = /^[A-Za-z\d@._-]{7,}$/;
        this.$log          = $log;
        this.$state        = $state;
        this.$q            = $q;

        this.AuthenticationService = AuthenticationService;
        this.AuthorizationService  = AuthorizationService;

        this.STATE_NAME            = UI_ENUMS.STATE_NAME;

        this.notAuthorized         = false;
    }

    $onInit () {
        this.action = 'login';
        this.user   = {
            'userId'   : '',
            'password' : ''
        };
        this.isBusy = false;
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
        this.$state.go(authorizedRedirect);
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
                    reject(err);
                });
        });
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
