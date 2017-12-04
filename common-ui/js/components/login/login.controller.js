class LoginController {
    constructor ($state, $q, $log, AuthenticationService, AuthorizationService, UI_ENUMS) {
        'ngInject';

        this.userIdPattern = '^[0-9]{6,7}$';
        this.$log          = $log;
        this.$state        = $state;
        this.$q            = $q;

        this.AuthenticationService = AuthenticationService;
        this.AuthorizationService  = AuthorizationService;

        this.STATE_NAME            = UI_ENUMS.STATE_NAME;
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
        // let state   = this.returnTo.state();
        // let params  = this.returnTo.params();
        // let options = Object.assign({}, this.returnTo.options(), {reload : true});
        this.$state.go(this.STATE_NAME.JOBS);
    }

    login (user) {
        return this.$q((resolve, reject) => {
            this
                .AuthenticationService
                .login(user)
                .then((user) => {
                    return this.AuthorizationService.setUserAuthorization(user.userId);
                })
                .then((user) => {
                    this.returnToOriginalState();
                    resolve(user);
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
