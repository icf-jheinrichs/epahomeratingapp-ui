import AWS from 'aws-sdk';
import angular from 'angular';
import {CognitoUserPool, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';

const DEFAULT_USER = Object.freeze({
    'userId'       : '',
    'firstName'    : '',
    'lastName'     : '',
    'email'        : '',
    'id_token'     : '',
    'access_token' : ''
});

const POOL_DATA = Object.freeze({
    'UserPoolId' : 'us-east-1_yyQUoZD72',
    'ClientId'   : '2t3nnng2lkumkb565qpjuo4qf7'
});

const USER_SESSION_ITEM = 'user';

class AuthenticationService {
    constructor ($q) {
        'ngInject';
        // TODO:
        try {
            this.user = angular.fromJson(window.sessionStorage.getItem(USER_SESSION_ITEM)) || Object.assign({}, DEFAULT_USER);
            this.userIsAuthenticated = this.user.userId > 0;
        } catch (err) {
            // console.log(err);
        }

        this.$q                  = $q;

        this.userPool = new CognitoUserPool(POOL_DATA);
        this.cognitoUser = this.userPool.getCurrentUser();
        this.authenticateLocalUser();
    }

    getLocalUser () {
        return this.$q ((resolve, reject) => {
            resolve(angular.fromJson(window.sessionStorage.getItem(USER_SESSION_ITEM)));
        });
    }

    getCognitoToken () {
        return this.$q ((resolve, reject) => {
            if (this.cognitoUser != null) {
                this.cognitoUser
                    .getSession((err, session) => {
                        if (!err) {
                            resolve(session.getIdToken().getJwtToken());
                        }
                        reject(err);
                    });
            } else {
                reject(null);
            }
        })
        .catch((err) => {
            // console.log(err);
        });
    }

    authenticateLocalUser () {
        var iter = [this.getLocalUser(), this.getCognitoToken()];

        this.$q.all(iter)
        .then((results) => {
            var localUser    = results[0];
            var localToken   = results[0].id_token;
            var cognitoToken = results[1];
            if (localToken == cognitoToken) {
                localUser.status = 200;
            } else {
                localUser.status = 403;
            }
            this.setUser(localUser);
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
        var authenticationDetails = new AuthenticationDetails(authenticationData);
        var userData = {
            'Username' : user.userId,
            'Pool'     : this.userPool
        };

        // TODO: gray out login button during this process
        return this.$q((resolve, reject) => {
            var cognitoUser = new CognitoUser(userData);
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess : (result) => {
                    resolve({
                        id_token       : result.getIdToken().getJwtToken(),
                        access_token   : result.getAccessToken().getJwtToken(),
                        cognitoUser    : cognitoUser
                    });
                },

                onFailure : (err) => {
                    // console.log(err);
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

                newPasswordRequired : (userAttributes, requiredAttributes) => {
                    // User was signed up by an admin and must provide new
                    // password and required attributes, if any, to complete
                    // authentication.

                    // TODO: need to come up with a screen for making new password after temp password.
                    var newPassword = 'tempPassword2!';

                    // creates user name or other attributes
                    var data = Object.freeze({
                        name        : 'alejandro',
                        family_name : 'quesada'
                    });

                    cognitoUser.completeNewPasswordChallenge(newPassword, data, this);

                    resolve({
                        id_token       : result.getIdToken().getJwtToken(),
                        access_token   : result.getAccessToken().getJwtToken(),
                        cognitoUser    : cognitoUser
                    });
                }
            });
        })
        .then(result => {
            this.cognitoUser = result['cognitoUser'];
            return this.$q((resolve, reject) => {
                this.userIDtoAWSCognitoCredentials(result['token']);
                resolve(
                    this.getAttributes(result['id_token'], result['access_token'])
                );
            })
            .then(result => {
                return result;
            });
        })
        .then(result => {
            return {
                message : 'success',
                status  : 200
            };
        })
        .catch((err) => {
            // console.log(err);
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
        return this.$q((resolve, reject) => {
            resolve({
                message : 'success',
                status  : 200
            });
        });
    }

    getAttributes (id_token, access_token) {
        return this.$q((resolve, reject) => {
            this.cognitoUser.getUserAttributes((err, result) => {
                var firstName = result[2]['Value'].charAt(0).toUpperCase() + result[2]['Value'].slice(1);
                var lastName  = result[3]['Value'].charAt(0).toUpperCase() + result[3]['Value'].slice(1);
                var email     = result[4]['Value'];
                resolve({
                    'firstName'    : firstName,
                    'lastName'     : lastName,
                    'email'        : email,
                    'id_token'     : id_token,
                    'access_token' : access_token,
                    'status'       : 200
                });
            });
        })
        .then(result => {
            this.setUser(result);
        });
    }

    setUser (attr) {
        if (attr['status'] === 200) {
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

    userIDtoAWSCognitoCredentials (id_token) {
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId : POOL_DATA.UserPoolId,
            Logins         : {
                AWS_KEY : id_token
            }
        });
    }
}


export default AuthenticationService;
