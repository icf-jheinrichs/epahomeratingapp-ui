/* globals AWS */

import angular from 'angular';

import {CognitoIdentityCredentials} from 'aws-sdk';
import {CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute} from 'amazon-cognito-identity-js';

const DEFAULT_USER = Object.freeze({
    'userId'            : '',
    'preferredUsername' : '',
    'password'          : '',
    'firstName'         : '',
    'lastName'          : '',
    'userType'          : '',
    'email'             : '',
    'id_token'          : '',
    'access_token'      : '',
    'refresh_token'     : '',
    'status'            : 403
});

const USER_SESSION_ITEM = 'user';

class AuthenticationService {
    constructor ($log, $q, COGNITO, UI_ENUMS, S3_CONFIG) {
        'ngInject';

        this.$log                 = $log;
        this.$q                   = $q;

        this.COGNITO              = COGNITO;
        this.S3_CONFIG            = S3_CONFIG;
        this.USER_TYPES           = UI_ENUMS.USER_TYPE;

        this.POOL_DATA = {
            'UserPoolId' : COGNITO.POOL_ID,
            'ClientId'   : COGNITO.CLIENT_ID
        };

        this.userPool    = new CognitoUserPool(this.POOL_DATA);

        this.cognitoUser = this.userPool.getCurrentUser();

        this.authenticateLocalUser();
    }

    getCognitoToken () {
        return this.$q((resolve, reject) => {
            this
                .cognitoUser
                .getSession((err, session) => {
                    if (!err) {
                        resolve(session.getIdToken().getJwtToken());
                    } else {
                        reject(err);
                    }
                });
        });
    }

    authenticateLocalUser () {
        let localUser = angular.fromJson(window.sessionStorage.getItem(USER_SESSION_ITEM));
        let cognitoToken;

        if (localUser === null || this.cognitoUser === null) {
            this.setUser(DEFAULT_USER);
        } else {
            this
                .getCognitoToken()
                .then((token) => {
                    cognitoToken = token;

                    if (localUser.id_token === cognitoToken) {
                        localUser.status = 200;

                        this.userIDtoAWSCognitoCredentials(localUser.id_token);
                    } else {
                        localUser.status = 403;
                    }

                    this.setUser(localUser);
                })
                .catch((error) => {
                    this.setUser(DEFAULT_USER);
                });
        }
    }

    getUser () {
        return this.user;
    }

    getUserResetPassword (C_ID) {
        return this.$q((resolve, reject) => {
            resolve({
                userName : 'Hi'
            });
        });
    }

    getUserInfo () {
        return {
            userId    : this.user.userId,
            firstName : this.user.firstName,
            lastName  : this.user.lastName,
            userType  : this.user.userType,
            email     : this.user.email
        };
    }

    checkLogin () {
        return this.$q((resolve, reject) => {
            reject('not supported');
        });
    }

    login (user) {
        let authenticationData = {
            'Username' : user.userId,
            'Password' : user.password
        };
        let authenticationDetails = new AuthenticationDetails(authenticationData);

        let userData = {
            'Username' : user.userId,
            'Pool'     : this.userPool
        };
        let cognitoUser = new CognitoUser(userData);

        return this.$q((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess : (result) => {
                    resolve({
                        id_token       : result.getIdToken().getJwtToken(),
                        access_token   : result.getAccessToken().getJwtToken(),
                        refresh_token  : result.getRefreshToken().getToken(),
                        cognitoUser    : cognitoUser
                    });
                },

                onFailure : (err) => {
                    let errorMessage;

                    switch (err.code) {
                    case 'NotAuthorizedException' :
                        errorMessage = {
                            status  : 400,
                            message : err.message
                        };
                        break;
                    case 'PasswordResetRequiredException' :
                        errorMessage = {
                            status  : 401,
                            message : err.message
                        };
                        break;
                    default :
                        errorMessage = {
                            status  : err.statusCode,
                            message : err.message
                        };
                        break;
                    }

                    reject(errorMessage);
                },

                newPasswordRequired : (userAttributes, requiredAttributes) => {
                    // // User was signed up by an admin and must provide new
                    // // password and required attributes, if any, to complete
                    // // authentication.

                    // // TODO: need to come up with a screen for making new password after temp password.

                    // const newPassword = 'TempPass2@';

                    // // creates user name or other attributes
                    // const data = Object.freeze({
                    //     name                     : 'Jeff',
                    //     family_name              : 'Heinrichs',
                    //     email                    : 'jeff.heinrichs@icf.com',
                    //     'custom:ratingCompanyID' : '000',
                    //     'custom:ratingUserID'    : '1224444'
                    // });

                    // cognitoUser.completeNewPasswordChallenge(newPassword, data, this);

                    // resolve({
                    //     id_token       : result.getIdToken().getJwtToken(),
                    //     access_token   : result.getAccessToken().getJwtToken(),
                    //     cognitoUser    : cognitoUser
                    // });
                }
            });
        })
            .then(result => {
                this.cognitoUser = result.cognitoUser;

                this.userIDtoAWSCognitoCredentials(result.id_token);

                return this.getAttributes(result.id_token, result.access_token, result.refresh_token);
            })
            .then(result => {
                this.setUser(result);

                return result;
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
        return this.$q((resolve, reject) => {
            this.setUser(DEFAULT_USER);
            resolve(this.user);
        });
    }

    getAttributes (id_token, access_token, refresh_token) {
        return this.$q((resolve, reject) => {
            this.cognitoUser
                .getUserAttributes((error, result) => {

                    if (!error) {
                        let attr = {};
                        result.map((obj) => {
                            attr[obj.Name] = obj.Value;
                        });

                        let preferredUsername = attr.preferred_username || '';
                        let firstName         = attr.name.charAt(0).toUpperCase() + attr.name.slice(1);
                        let lastName          = attr.family_name.charAt(0).toUpperCase() + attr.family_name.slice(1);
                        let email             = attr.email;
                        let userType          = attr['custom:userType'] || '';
                        let ratingCompanyID   = attr['custom:ratingCompanyID'] || '';

                        resolve({
                            status       : 200,
                            preferredUsername,
                            firstName,
                            lastName,
                            email,
                            userType,
                            id_token,
                            access_token,
                            refresh_token,
                            ratingCompanyID
                        });
                    } else {
                        reject({
                            status  : 403,
                            message : error
                        });
                    }
                });
        });
    }

    setPreferredUsername (attributes) {
        let attributeList = [];
        attributes.forEach((attribute) => {
            let cognitoUserAttribute = new CognitoUserAttribute(attribute);

            attributeList.push(cognitoUserAttribute);
        });

        return this.$q((resolve, reject) => {
            this
                .cognitoUser
                .updateAttributes(attributeList, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        let user = Object.assign({}, this.user, {
                            status            : 200,
                            preferredUsername : attributeList[0].Value
                        });

                        this.setUser(user);

                        resolve(result);
                    }
                });
        });
    }

    setUserPassword (oldPassword, newPassword) {
        return this.$q((resolve, reject) => {
            this
                .cognitoUser
                .changePassword(oldPassword, newPassword, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
        });
    }

    setUser (attr) {
        // TODO:
        // refactor?
        if (attr['status'] === 200) {
            delete attr.status;
            attr.userId = this.cognitoUser.getUsername();

            this.userIsAuthenticated = true;

            attr.userType = this.USER_TYPES.PROVIDER;
            this.user = Object.assign({}, attr);

            // TODO: Is there a more secure way to store persistant login?
            window.sessionStorage.setItem(USER_SESSION_ITEM, angular.toJson(this.user));
        } else {
            // if there is a signed on cognitouser but a disagreeable
            // token - the cognitouser is signed out
            if (this.cognitoUser !== null) {
                this.cognitoUser.signOut();
            }

            this.userIsAuthenticated = false;
            this.user = Object.assign({}, DEFAULT_USER);

            window.sessionStorage.setItem(USER_SESSION_ITEM, angular.toJson(this.user));
        }
    }

    checkCognitoCredentials () {
        return this.$q((resolve, reject) => {
            if (AWS.config.credentials.needsRefresh()) {
                AWS.config.credentials.clearCachedId();
                AWS.config.credentials.get((err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            } else {
                AWS.config.credentials.get((err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            }
        });
    }

    userIDtoAWSCognitoCredentials (id_token) {
        let cognitoCredentials = new CognitoIdentityCredentials({
            IdentityPoolId : this.S3_CONFIG.IDENTITY_POOL_ID,
            Logins         : {[`cognito-idp.${this.COGNITO.REGION}.amazonaws.com/${this.COGNITO.POOL_ID}`] : id_token},
            region         : this.S3_CONFIG.BUCKET_REGION
        });

        AWS.config.update({
            region      : this.COGNITO.REGION,
            credentials : cognitoCredentials
        });

        // Config.credentials = new CognitoIdentityCredentials({
        //     IdentityPoolId : this.POOL_DATA.UserPoolId,
        //     Logins         : {
        //         AWS_KEY : id_token
        //     }
        // });
    }
}


export default AuthenticationService;
