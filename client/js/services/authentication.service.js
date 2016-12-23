import angular from 'angular';

//TODO: finalize user data structure.
const DEFAULT_USER = Object.freeze({
    'userId'    : '',
    'firstName' : '',
    'lastName'  : '',
    'email'     : ''
});

//TODO: Delete this
const FAKE_USER = Object.freeze({
    'userId'    : '1234567',
    'firstName' : 'Greg',
    'lastName'  : 'Gregerson',
    'email'     : 'greggergerson@bobsbuilders.com'
});

const USER_SESSION_ITEM = 'user';

class AuthenticationService {
    constructor ($q) {
        'ngInject';

        this.$q                  = $q;

        //TODO: refactor?
        //try looking in session storage for user object, if null use default
        try {
            this.user = angular.fromJson(window.sessionStorage.getItem(USER_SESSION_ITEM)) || Object.assign({}, DEFAULT_USER);
        } catch (error) {
            this.user = Object.assign({}, DEFAULT_USER);
        }

        this.userIsAuthenticated = this.user.userId.length > 0;
    }

    getUser () {
        return this.user;
    }

    login (user) {
        this.userIsAuthenticated = true;
        this.user                = Object.assign({}, FAKE_USER);

        window.sessionStorage.setItem(USER_SESSION_ITEM, angular.toJson(this.user));

        return this.$q((resolve, reject) => {
            resolve({
                message : 'success',
                status  : 200
            });

            /* Example error cases */

            // User/ Pass don't match
            // reject({
            //     message : 'not found',
            //     status  : 404
            // });

            // Server error
            // reject({
            //     message : 'server error',
            //     status  : 500
            // });
        });
    }

    resetPassword (user) {
        return this.$q((resolve, reject) => {
            resolve({
                message : 'success',
                status  : 200
            });

            /* Example error cases */

            // User/ Pass don't match
            // reject({
            //     message : 'not found',
            //     status  : 404
            // });

            // Server error
            // reject({
            //     message : 'server error',
            //     status  : 500
            // });
        });
    }

    logout () {
        this.userIsAuthenticated = false;
        this.user                = Object.assign({}, DEFAULT_USER);

        return this.$q((resolve, reject) => {
            window.sessionStorage.setItem(USER_SESSION_ITEM, angular.toJson(DEFAULT_USER));

            resolve({
                message : 'success',
                status  : 200
            });
        });
    }
}

export default AuthenticationService;
