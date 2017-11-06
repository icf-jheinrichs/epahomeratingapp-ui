import angular from 'angular';

import AuthenticationService from './authentication.service';
import CameraService from './camera.service';
import DisplayLogicDigestService from './display-logic-digest.service';
import JobsService from './jobs.service';
import JobDisplayListService from './job-display-list.service';
import JobDataResponseService from './job-data-response.service';
import JobDataHomePerformanceService from './job-data-home-performance.service';
import HousePlansService from './house-plans.service';
import ManufacturersService from './manufacturers.service';
import PDFService from './pdf.service';
import ScannerService from './scanner.service';
import SyncService from './sync.service';
import AssetCacheService from './asset-cache.service';
import PouchDBService from './pouchDB.service';

let servicesModule
    = angular
        .module('epahomeratingapp.services', [])
        .service('AuthenticationService', AuthenticationService)
        .service('CameraService', CameraService)
        .service('DisplayLogicDigestService', DisplayLogicDigestService)
        .service('JobsService', JobsService)
        .service('JobDisplayListService', JobDisplayListService)
        .service('JobDataResponseService', JobDataResponseService)
        .service('JobDataHomePerformanceService', JobDataHomePerformanceService)
        .service('ManufacturersService', ManufacturersService)
        .service('HousePlansService', HousePlansService)
        .service('PDFService', PDFService)
        .service('ScannerService', ScannerService)
        .service('SyncService', SyncService)
        .service('AssetCacheService', AssetCacheService)
        .service('PouchDBService', PouchDBService);

export default servicesModule;
