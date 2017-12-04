const APIGATEWAY_URI = process.env.APIGATEWAY_URI;

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
    POOL_ID   : process.env.COGNITO_POOL_ID,
    CLIENT_ID : process.env.COGNITO_CLIENT_ID
};
