import Promise from 'bluebird';
import angular from 'angular';
import { CognitoUserPool, CognitoIdentityCredentials, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

//TODO: finalize user data structure.
const DEFAULT_USER = Object.freeze({
    'userId'    : '',
    'firstName' : '',
    'lastName'  : '',
    'email'     : '',
    'token'     : ''
});

const POOL_DATA = Object.freeze({ 
        'UserPoolId' : 'us-east-1_zKpKa1FkU',
        'ClientId' : '2l41s1i0mm122a0ulorbea7enj'
    });

const AWS_KEY = "cognito-idp.<" + AMAZON_REGION + ">.amazonaws.com/<" + POOL_DATA.UserPoolId + '>';

const AMAZON_REGION = 'us-east';

const USER_SESSION_ITEM = 'user';

class AuthenticationService {
    constructor ($q) {
        'ngInject';

        this.$q                  = $q;

        //TODO: refactor?
        //try looking in session storage for user object, if null use default
        try {
            this.user = angular.fromJson(window.sessionStorage.getItem(USER_SESSION_ITEM)) || Object.assign({}, DEFAULT_USER);
        } catch (err) {
            this.user = Object.assign({}, DEFAULT_USER);
        }

        this.userPool = new CognitoUserPool( POOL_DATA );
        this.cognitoUser = this.userPool.getCurrentUser();
        if (this.cognitoUser != null) {
            var auth = Promise.promisify(this.getSession.bind(this));
            
            // ERRORS OCCUR HERE
            auth().then( function (res) {
                this.userIsAuthenticated = this.compareTokens();
                if (this.userIsAuthenticated) {
                    this.userIDtoAWSCognitoCredentials();
                    return Promise.resolve({
                        'status' : 200
                    });
                } else {
                    this.setUser({'status' : 403});
                    return Promise.reject({
                        'status' : 500
                    });
                }
            })
            .catch(console.log)
            .bind(this);
        }
    }

    getUser () {
        return this.user;
    }

    login (user) {
        var authenticationData = {
            'Username' : user.userId,
            'Password' : user.password,
        };
        var authenticationDetails = new AuthenticationDetails( authenticationData );
        var userData = {
            'Username' : user.userId,
            'Pool'     : this.userPool
        };
        this.cognitoUser = new CognitoUser(userData);
        this.cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                // all of the this' here need to be binded to derive from orig object. 
                // most of my focus thus far has been in constructor check (though moving
                // the async outside of the contrucutor could be a good idea)
                this.token = result.getIdToken().getJwtToken();
                this.userIDtoAWSCognitoCredentials();  
                
                var auth = Promise.promisify(this.getSession).bind(this);

                // ERRORS OCCUR HERE
                auth().then(this.getAttributes)
                .then(this.setUser)
                .catch(console.log)
                .bind(this);

                return this.$q((resolve, reject) => {
                    resolve({
                        message : 'success',
                        status  : 200
                    });
                });
            },

            onFailure: function(err) {
                alert(err);

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
            },

            newPasswordRequired: function(userAttributes, requiredAttributes) {
                // User was signed up by an admin and must provide new 
                // password and required attributes, if any, to complete 
                // authentication.

                // TODO: need to come up with a screen for making new password after temp password. 
                var newPassword = 'tempPassword2!'
                // creates user name or other attributes
                var data = Object.freeze({
                    name: 'alejandro quesada'
                }) 

                // Get these details and call 
                this.cognitoUser.completeNewPasswordChallenge(newPassword, data, this)
            }
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
        this.setUser({'status' : '403'});
        this.cognitoUser.signOut();

        return this.$q((resolve, reject) => {
            resolve({
                message : 'success',
                status  : 200
            });
        });
    }

    // compare local stored token to cognitouser at onset
    // if different, when one is stored, then user 
    compareTokens () {
        if (this.user.token == this.token) {
            return true;
        } else {
            this.token = '';
            return false;
        }
    }

    getAttributes (res) {
        if (res['status'] == 200) {
            this.cognitoUser.getUserAttributes(function(err, result) {
                if (err) {
                    return Promise.reject(err);
                }
                return Promise.resolve({
                    'firstName' : result[2]['Name'],
                    'lastName'  : result[2]['Name'],
                    'email'     : result[3]['Name']
                });
            });
        } else {
            return Promise.reject({
                'status' : 500
            })
        }
    }

    getSession () {
        this.cognitoUser
            .getSession(function(err, session) {
                if (err) {
                    return Promise.reject(err);
                }
                this.token = session.getIdToken().getJwtToken();
                return Promise.resolve({
                    'status' : 200
                });
            });
    }

    setUser (attr) {
        // TODO: attach token to user
        if (attr['status'] != 403 || attr['status'] != 500) {
            delete attr['status'];
            attr['userId'] = this.cognitoUser.getUsername();
            attr['token']  = this.token;
            this.userIsAuthenticated = true;
            this.user = Object.assign({}, attr);
            
            // TODO: Is there a more secure way to store persistant login?
            window.sessionStorage.setItem(USER_SESSION_ITEM, angular.toJson(this.user));
        } else {
            this.userIsAuthenticated = false;
            this.user = Object.assign({}, DEFAULT_USER);
            window.sessionStorage.setItem(USER_SESSION_ITEM, angular.toJson(DEFAULT_USER));
        }
    }

    userIDtoAWSCognitoCredentials () {
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId : POOL_DATA.UserPoolId, // your identity pool id here
            Logins : {
                AWS_KEY : this.token
            }
        });
    }
};


export default AuthenticationService;
