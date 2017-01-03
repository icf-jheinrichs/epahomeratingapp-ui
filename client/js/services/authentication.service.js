import AWS from 'aws-sdk';
import angular from 'angular';
import Promise from 'bluebird';
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

        // TODO:
        // Look to refactor?
        try {
            this.user = angular.fromJson(window.sessionStorage.getItem(USER_SESSION_ITEM)) || Object.assign({}, DEFAULT_USER);
            this.userIsAuthenticated = this.user.userId > 0;

        } catch (err) {
            console.log(err);
        }

        this.$q                  = $q;

        this.userPool = new CognitoUserPool( POOL_DATA );
        this.cognitoUser = this.userPool.getCurrentUser();
        this.authenticateStoredUser();
    }

    setToken (res) {
        this.token = res['token'];
    }

    authenticateStoredUser () {
        var local = new Promise((resolve, reject) => {
                resolve(angular.fromJson(window.sessionStorage.getItem(USER_SESSION_ITEM)));
            });

        var token = new Promise((resolve, reject) => {
                    if (this.cognitoUser != null) {
                        this.cognitoUser
                            .getSession(function(err, session) {
                                if (!err) {
                                    resolve(session.getIdToken().getJwtToken());
                                }
                                reject(err);
                            });
                    } else {
                        reject(null);
                    }
                });

        var iter = [ local, token.bind(this) ];

        Promise.all(iter).then(results => {
            var localUser    = results[0];
            var localToken   = results[0].token;
            var cognitoToken = results[1];
            if (localToken == cognitoToken) {
                localUser.status = 200;
            } else {
                localUser.status = 403;
            }
            this.setUser(localUser);
        })
        .bind(this)
        .catch(function(err) {
            this.setUser({'status':403});
        });
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

        var login = new Promise((resolve, reject) => {
            this.cognitoUser = new CognitoUser(userData);
            this.cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    resolve(result.getIdToken().getJwtToken())
                },

                onFailure: function(err) {
                    console.log(err);
                    reject({
                        message : err,
                        status  : 403 
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

                    // TODO: test this - may need to have it send token to stay consistent. 
                    // could cause issues with first login attempts from admin create user
                    resolve(null);
                }
            });
        });

        return this.$q((resolve, reject) => {
            resolve(
                login
                .then(result => {
                    this.userIDtoAWSCognitoCredentials(result);
                    this.getAttributes(result); 
                })
                .return(
                    resolve({
                        message : 'success',
                        status  : 200
                    })
                )
                .bind(this)
            )
        })
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
        return this.$q((resolve, reject) => {
            resolve({
                message : 'success',
                status  : 200
            });
        });
    }

    getAttributes (token) {
        var attr = new Promise((resolve, reject) => {
            this.cognitoUser.getUserAttributes(function(err, result) {
                resolve({
                    'firstName' : result[2]['Value'],
                    'lastName'  : result[2]['Value'],
                    'email'     : result[3]['Value'],
                    'token'     : token,
                    'status'    : 200
                });
            });
        });

        attr
        .then(result => {
            this.setUser(result);
        })
        .bind(this);
    }

    setUser (attr) {
        // TODO:
        // refactor? 
        if (attr['status'] == 200) {
            delete attr.status;
            attr.userId = this.cognitoUser.getUsername();

            this.userIsAuthenticated = true;
            this.user = Object.assign({}, attr);
            
            // TODO: Is there a more secure way to store persistant login?
            window.sessionStorage.setItem(USER_SESSION_ITEM, angular.toJson(this.user));
        } else {
            // if there is a signed on cognitouser but a disagreeable 
            // token - the cognitouser is signed out
            if (this.cognitoUser != null) {
                this.cognitoUser.signOut();
            }
            this.userIsAuthenticated = false;
            this.user = Object.assign({}, DEFAULT_USER);
            window.sessionStorage.setItem(USER_SESSION_ITEM, angular.toJson(DEFAULT_USER));
        }
    }

    userIDtoAWSCognitoCredentials (token) {
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId : POOL_DATA.UserPoolId,
            Logins : {
                AWS_KEY : token
            }
        });
    }
};


export default AuthenticationService;
