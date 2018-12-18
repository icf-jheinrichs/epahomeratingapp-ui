import angular from 'angular';

import AnalyticsService from './analytics.service';
import AuthenticationService from './authentication.service';
import AuthorizationService from './authorization.service';
import AssetPathService from './asset-path.service';
import CameraService from './camera.service';
import DisplayLogicDigestService from './display-logic-digest.service';
import HousePlansService from './house-plans.service';
import GeolocationService from './geolocation.service';
import JobsService from './jobs.service';
import JobDisplayListService from './job-display-list.service';
import JobDataResponseService from './job-data-response.service';
import JobDataHomePerformanceService from './job-data-home-performance.service';
import ManufacturersService from './manufacturers.service';
import ScannerService from './scanner.service';
import SyncService from './sync.service';
import UserCompanyService from './user-company.service';

let servicesModule
    = angular
        .module('epahomeratingapp.services', [])
        .service('AnalyticsService', AnalyticsService)
        .service('AuthenticationService', AuthenticationService)
        .service('AuthorizationService', AuthorizationService)
        .service('AssetPathService', AssetPathService)
        .service('CameraService', CameraService)
        .service('DisplayLogicDigestService', DisplayLogicDigestService)
        .service('HousePlansService', HousePlansService)
        .service('GeolocationService', GeolocationService)
        .service('JobsService', JobsService)
        .service('JobDisplayListService', JobDisplayListService)
        .service('JobDataResponseService', JobDataResponseService)
        .service('JobDataHomePerformanceService', JobDataHomePerformanceService)
        .service('ManufacturersService', ManufacturersService)
        .service('ScannerService', ScannerService)
        .service('SyncService', SyncService)
        .service('UserCompanyService', UserCompanyService);

export default servicesModule;
