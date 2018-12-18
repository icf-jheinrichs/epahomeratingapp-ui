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
export const BASE_S3_URL = `https://s3.amazonaws.com/${process.env.S3_BUCKET_NAME_PREFIX}-rating-company/`;

export const COGNITO = {
    REGION    : DEFAULT_REGION,
    POOL_ID   : process.env.COGNITO_POOL_ID,
    CLIENT_ID : process.env.COGNITO_CLIENT_ID
};

export const S3_CONFIG = {
    PATH_PDF              : 'pdfs',
    BUCKET_REGION         : DEFAULT_REGION,
    IDENTITY_POOL_ID      : process.env.IDENTITY_POOL_ID,
    S3_BUCKET_NAME_PREFIX : process.env.S3_BUCKET_NAME_PREFIX
};

export const PATTERN = {
    USER_NAME : /^[A-Za-z\d@._-]{7,}$/,
    PASSWORD  : /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
};

export const PAGINATION = {
    PAGE_SIZE : 20
};
