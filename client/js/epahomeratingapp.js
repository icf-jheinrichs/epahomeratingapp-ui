// Angular Library
import angular from 'angular';
import ngAria from 'angular-aria';
import uiRouter from 'angular-ui-router';

// Site Styles
import 'normalize.css';
import 'font-awesome/css/font-awesome.css';

// Services
import ServicesModule from './services/services.module';

// Routes
import epahomeratingappRoutes from './epahomeratingapp.routes';

// Component Modules
import ComponentsModule from '../../epahomeratingappUI.js';

// Root Component
import epahomeratingappComponent from './epahomeratingapp.component';

const APP_NAME = 'epahomeratingapp';

angular
    .module(APP_NAME, [
        ServicesModule.name,
        ComponentsModule.name,
        ngAria,
        uiRouter
    ])
    .component(APP_NAME, epahomeratingappComponent)
    .config(epahomeratingappRoutes);

angular
    .element(document)
    .ready(function handleDocumentReady () {
        let initInjector = angular.injector(['ng']);
        let $http        = initInjector.get('$http');

        $http
            .get('/api/display-logic/digest')
            .then(function handleDisplayLogic (response) {
                angular
                    .module(APP_NAME)
                    .constant('DISPLAY_LOGIC_DIGEST', response.data);

                angular.bootstrap(document, [APP_NAME]);
            })
            .catch(function handleDisplayLogicError (response) {
                //TODO: handle error
            });
    });
