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
        this
            .AuthenticationService
            .checkLogin()
            .then((userData) => {
                // no resolve needed. handle success here.
                // resolve(data);
                this.$log.log('Check login complete:' + JSON.stringify(userData));
                let userInfo = angular.fromJson(userData);

                this.user.userId = userInfo.userId;
                this.user.password = userInfo.password;

                return (this.user);
            })
            .then((data) => {
                this.$log.log('Attempting Login');
                this.login(data);
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
