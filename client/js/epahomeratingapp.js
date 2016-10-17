// Angular Library
import angular from 'angular';
import uiRouter from 'angular-ui-router';

// Site Styles
import 'normalize.css';
import 'font-awesome/css/font-awesome.css';

// Constants
import {DB, CATEGORIES, CATEGORY_PROGRESS, RESPONSES} from './epahomeratingapp.constant';

// DB
import purgeData from './services/db/purge-data';
import seedData from './services/db/seed-data';

// Services
import ServicesModule from './services/services.module';

// Routes
import epahomeratingappRoutes from './epahomeratingapp.routes';

// Component Modules
import ComponentsModule from '../../epahomeratingappUI.js';

// Root Component
import epahomeratingappComponent from './epahomeratingapp.component';

const APP_NAME  = 'epahomeratingapp';

angular
    .module(APP_NAME, [
        ServicesModule.name,
        ComponentsModule.name,
        uiRouter
    ])
    .component(APP_NAME, epahomeratingappComponent)
    .config(epahomeratingappRoutes)
    .constant('DB', DB)
    .constant('CATEGORIES', CATEGORIES)
    .constant('CATEGORY_PROGRESS', CATEGORY_PROGRESS)
    .constant('RESPONSES', RESPONSES);

angular
    .element(document)
    .ready(function handleDocumentReady () {
        purgeData(DB)
            .then(function handlePurge () {
                return seedData(DB);
            })
            .then(function handleBootstrap () {
                angular.bootstrap(document, [APP_NAME]);
            })
            .catch(function handleInfoError (err) {
                //TODO: this
            });
    });
