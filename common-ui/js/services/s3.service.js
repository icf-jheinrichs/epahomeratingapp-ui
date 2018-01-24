/* globals AWS */
import uuidv4 from 'uuid/v4';

class S3Service {
    constructor (
        $log,
        $q,
        AuthenticationService,
        AuthorizationService,
        COGNITO,
        S3_CONFIG
    ) {
        'ngInject';

        this.$q                    = $q;
        this.$log                  = $log;

        this.AuthenticationService = AuthenticationService;
        this.AuthorizationService  = AuthorizationService;

        this.COGNITO               = COGNITO;
        this.S3_CONFIG             = S3_CONFIG;
    }

    upload (path, file, token) {
        const company  = this.AuthorizationService.getCurrentOrganizationId();
        const filename = uuidv4();
        const key      = `${company}/${path}/${filename}`;

        const id_token   = this.AuthenticationService.getUser().id_token;
        const bucketName = `${this.S3_CONFIG.S3_BUCKET_NAME_PREFIX}-rating-company`;

        let cognitoCredentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId : this.S3_CONFIG.IDENTITY_POOL_ID,
            Logins         : {[`cognito-idp.${this.COGNITO.REGION}.amazonaws.com/${this.COGNITO.POOL_ID}`] : id_token},
            region         : this.S3_CONFIG.BUCKET_REGION
        });

        AWS.config.update({
            region      : this.S3_CONFIG.BUCKET_REGION,
            credentials : cognitoCredentials
        });

        let s3 = new AWS.S3({
            apiVersion : '2006-03-01',
            params     : {Bucket : bucketName}
        });

        return this.$q((resolve, reject) => {
            s3.upload({
                Key  : key,
                Body : file,
                ACL  : 'public-read'
            }, (error, data) => {
                if (error) {
                    reject({
                        message : 'There was an error uploading your photo',
                        status  : 'failure',
                        error   : error
                    });
                }
                resolve({
                    message : 'File uploaded',
                    status  : 'success',
                    data    : {
                        s3Response : data,
                        request    : {
                            fileName : file.name,
                            token    : token
                        }
                    }
                });
            });
        });
    }
}

export default S3Service;
