// Angular Library
import angular from 'angular';
import angularSanitize from 'angular-sanitize';
import angularMessages from 'angular-messages';
import uiRouter from '@uirouter/angularjs';

// Site Styles
import 'normalize.css';
import 'font-awesome/css/font-awesome.css';

// Constants
import {API_URL, BASE_IMAGE_URL, COGNITO} from './epahomeratingapp.config';
import {UI_ENUMS} from '../../epahomeratingappUI.js';

// Services
import ServicesModule from './services/services.module';
import {authenticationHook} from './services/authentication.hook';

// Interceptor
// @todo replace http-request service with this. import and use in module below appr.
let interceptor = ($q) => {
    'ngInject';

    return {
        request  : (config) => {
            // @todo refactor
            if (angular.fromJson(window.sessionStorage.getItem('user')) !== null) {
                let user = angular.fromJson(window.sessionStorage.getItem('user'));
                let ratingCompanyID = angular.fromJson(window.sessionStorage.getItem('userAuthentication')).currentOrganization;

                if (!config.headers.Authorization) {
                    config.headers.Authorization = user.access_token;
                } else {
                    config.headers.Authorization = undefined;
                }
                config.headers['RatingCompanyID'] = ratingCompanyID;
            }
            return config;
        },

        response : (result) => {
            return result;
        },

        responseError : (rejection) => {
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
    .constant('UI_ENUMS', UI_ENUMS)
    .constant('CONTEXT', UI_ENUMS.CONTEXT.ADMIN)
    .run(authenticationHook)
    .run(($transitions) => {
        'ngInject';

        $transitions.onSuccess(
            {to : '*'}, () => {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
        );
    });

angular
    .element(document)
    .ready(function handleDocumentReady () {
        angular.bootstrap(document, [APP_NAME]);
    });
