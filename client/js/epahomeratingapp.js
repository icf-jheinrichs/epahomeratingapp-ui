// Angular Library
import angular from 'angular';
import uiRouter from 'angular-ui-router';

// Site Styles
import 'normalize.css';
import 'font-awesome/css/font-awesome.css';

// Constants
import {DB, CONFIG, MESSAGING, JOB_STATUS, CATEGORIES, RATING_TYPES, CATEGORY_PROGRESS, RESPONSES} from './epahomeratingapp.constant';

// DB
import purgeData from './services/db/purge-data';
import seedData from './services/db/seed-data';

// Services
import ServicesModule from './services/services.module';

// Routes
import epahomeratingappRoutes from './epahomeratingapp.routes';

// Component Modules
import ComponentsModule from '../../epahomeratingappUI.js';

// Pages Modules
import PagesModule from './pages/pages.module';

// Root Component
import epahomeratingappComponent from './epahomeratingapp.component';

const APP_NAME  = 'epahomeratingapp';

angular
    .module(APP_NAME, [
        ServicesModule.name,
        ComponentsModule.name,
        PagesModule.name,
        uiRouter
    ])
    .component(APP_NAME, epahomeratingappComponent)
    .config(epahomeratingappRoutes)
    .constant('DB', DB)
    .constant('CONFIG', CONFIG)
    .constant('MESSAGING', MESSAGING)
    .constant('JOB_STATUS', JOB_STATUS)
    .constant('CATEGORIES', CATEGORIES)
    .constant('RATING_TYPES', RATING_TYPES)
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
