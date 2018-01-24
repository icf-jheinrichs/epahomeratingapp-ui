const APIGATEWAY_URI = process.env.APIGATEWAY_URI;
const DEFAULT_REGION = 'us-east-1';

export const API_URL = {
    DISPLAY_LOGIC_DIGEST      : `${APIGATEWAY_URI}/display_logic/digest`,
    JOB                       : `${APIGATEWAY_URI}/job`,
    JOB_DISPLAY_LIST          : `${APIGATEWAY_URI}/job-display-list`,
    JOB_DATA_RESPONSE         : `${APIGATEWAY_URI}/job/response_data`,
    JOB_DATA_HOME_PERFORMANCE : `${APIGATEWAY_URI}/job/home_performance_data`,
    HOUSE_PLAN                : `${APIGATEWAY_URI}/house_plan`,
    COMPANY                   : `${APIGATEWAY_URI}/company`,
    USER                      : `${APIGATEWAY_URI}/user`
};

export const BASE_IMAGE_URL = process.env.S3_PREFIX;

export const COGNITO = {
    REGION    : DEFAULT_REGION,
    POOL_ID   : process.env.COGNITO_POOL_ID,
    CLIENT_ID : process.env.COGNITO_CLIENT_ID
};

export const S3_CONFIG = {
    BUCKET_REGION         : DEFAULT_REGION,
    IDENTITY_POOL_ID      : process.env.IDENTITY_POOL_ID,
    S3_BUCKET_NAME_PREFIX : process.env.S3_BUCKET_NAME_PREFIX
};
