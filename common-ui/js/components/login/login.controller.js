class LoginController {
    constructor ($state, $q, AuthenticationService) {
        'ngInject';

        this.userIdPattern = '^[0-9]{6,7}$';

        this.$state                = $state;
        this.$q                    = $q;
        this.AuthenticationService = AuthenticationService;
    }

    $onInit () {
        this.action = 'login';
        this.user   = {
            'userId'   : '',
            'password' : ''
        };
    }

    setAction (action) {
        this.action = action;
    }

    returnToOriginalState () {
        let state   = this.returnTo.state();
        let params  = this.returnTo.params();
        let options = Object.assign({}, this.returnTo.options(), {reload : true});

        this.$state.go(state.name, params, options);
    }

    login (user) {
        return this.$q((resolve, reject) => {
            this
                .AuthenticationService
                .login(user)
                .then((data) => {
                    // no resolve needed. handle success here.
                    // resolve(data);
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
