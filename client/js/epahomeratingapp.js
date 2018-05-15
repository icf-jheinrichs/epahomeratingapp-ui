// Angular Library
import angular from 'angular';
import angularSanitize from 'angular-sanitize';
import angularMessages from 'angular-messages';
import uiRouter from '@uirouter/angularjs';

// Site Styles
import 'normalize.css';
import 'font-awesome/css/font-awesome.css';

// Constants
import {API_URL, BASE_IMAGE_URL, COGNITO, S3_CONFIG, PAGINATION} from './epahomeratingapp.config';
import {UI_ENUMS, CONFIG} from '../../epahomeratingappUI.js';

// Services
import ServicesModule from './services/services.module';
import {authenticationHook} from './services/authentication.hook';

// AWS SDK
import AWS from 'aws-sdk/global'; // eslint-disable-line no-unused-vars

// Interceptor
// @todo replace http-request service with this. import and use in module below appr.
let interceptor = ($log, $rootScope, $q, UI_ENUMS) => {
    'ngInject';

    return {
        request  : (config) => {
            // @todo refactor
            const authorize = (config.headers && config.headers.authorize !== false) || config.headers === undefined;

            if (authorize && angular.fromJson(window.sessionStorage.getItem('user')) !== null) {
                let user            = angular.fromJson(window.sessionStorage.getItem('user'));
                let ratingCompanyID = (window.sessionStorage.getItem('userAuthentication') === 'undefined' || window.sessionStorage.getItem('userAuthentication') === null) ? '' : angular.fromJson(window.sessionStorage.getItem('userAuthentication')).currentOrganization;

                if (!config.headers.Authorization) {
                    config.headers.Authorization = user.access_token;
                } else {
                    config.headers.Authorization = undefined;
                }

                if (config.ratingCompanyID) {
                    ratingCompanyID = config.ratingCompanyID;
                }

                config.headers['RatingCompanyID'] = ratingCompanyID;
            }
            return config;
        },

        response : (result) => {
            return result;
        },

        responseError : (rejection) => {
            $log.log(rejection);
            const jwtError = '"Unauthorized signature for this JWT Token"';

            if (rejection && rejection.message && rejection.message.indexOf(jwtError)) {
                $rootScope.$emit(UI_ENUMS.MESSAGING.INVALID_JWT);
            }

            return $q.reject(rejection);
        }
    };
};

// Routes
import epahomeratingappRoutes from './epahomeratingapp.routes';

// Component Modules
import {ComponentsModule, FiltersModule, UIServicesModule} from '../../epahomeratingappUI.js';
import AdminComponentsModule from './components/components.module.js';

// Pages Modules
import PagesModule from './pages/pages.module';

// Root Component
import epahomeratingappComponent from './epahomeratingapp.component';

const APP_NAME  = 'epahomeratingapp';

angular
    .module(APP_NAME, [
        ServicesModule.name,
        ComponentsModule.name,
        FiltersModule.name,
        UIServicesModule.name,
        AdminComponentsModule.name,
        PagesModule.name,
        uiRouter,
        angularSanitize,
        angularMessages
    ])
    .component(APP_NAME, epahomeratingappComponent)
    .config(epahomeratingappRoutes)
    .config($httpProvider => {
        'ngInject';

        $httpProvider.interceptors.push(interceptor);
    })
    .constant('API_URL', API_URL)
    .constant('BASE_IMAGE_URL', BASE_IMAGE_URL)
    .constant('COGNITO', COGNITO)
    .constant('S3_CONFIG', S3_CONFIG)
    .constant('UI_ENUMS', UI_ENUMS)
    .constant('VALIDATION_PATTERN', CONFIG.VALIDATION_PATTERN)
    .constant('CONTEXT', UI_ENUMS.CONTEXT.ADMIN)
    .constant('PAGINATION', PAGINATION)
    .run(authenticationHook)
    .run(($transitions) => {
        'ngInject';

        $transitions.onSuccess(
            {to : '**'}, () => {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
        );
    });

angular
    .element(document)
    .ready(function handleDocumentReady () {
        angular.bootstrap(document, [APP_NAME]);
    });
