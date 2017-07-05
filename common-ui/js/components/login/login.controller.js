class LoginController {
    constructor ($state, $q, $log, AuthenticationService) {
        'ngInject';

        this.userIdPattern = '^[0-9]{6,7}$';
        this.$log          = $log;
        this.$state        = $state;
        this.$q            = $q;

        this.AuthenticationService = AuthenticationService;
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
                let userInfo = angular.fromJson(userData);

                this.user.userId = userInfo.userId;
                this.user.password = userInfo.password;

                return (this.user);
            })
            .then((data) => {
                this.isBusy = true;
                this.login(data);
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

        this.$state.go('jobs');
    }

    login (user) {
        return this.$q((resolve, reject) => {
            this
                .AuthenticationService
                .login(user)
                .then((data) => {
                    // no resolve needed. handle success here.
                    // resolve(data);
                    this.$log.log('Login returning:' + JSON.stringify(data));
                    this.returnToOriginalState();
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
