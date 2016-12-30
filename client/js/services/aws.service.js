import AWS from 'aws-sdk';

// currently not in use.

const POOL_DATA = Object.freeze({ 
    'UserPoolId' : 'us-east-1_zKpKa1FkU',
    'ClientId' : '2l41s1i0mm122a0ulorbea7enj'
});
const AMAZON_REGION = 'us-east';
const AWS_KEY = "cognito-idp.<" + AMAZON_REGION + ">.amazonaws.com/<" + POOL_DATA.UserPoolId + '>';


class AWSService {
    userIDtoAWSCognitoCredentials (token) {
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId : POOL_DATA.UserPoolId, // your identity pool id here
            Logins : {
                AWS_KEY : token
            }
        });
    }
};

export default AWSService;