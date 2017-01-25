import angular from 'angular';
import CameraService from './camera.service';
import DisplayLogicDigestService from './display-logic-digest.service';
import JobsService from './jobs.service';
import JobDisplayListService from './job-display-list.service';
import JobDataResponseService from './job-data-response.service';
import JobDataHomePerformanceService from './job-data-home-performance.service';
import HousePlansService from './house-plans.service';
import AuthenticationService from './authentication.service';
import HttpRequestService from './http-request.service';
// import AWSService from './aws.service';

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
            .service('HousePlansService', HousePlansService)
            .service('HttpRequestService', HttpRequestService);
            // .service('AWSService', AWSService);

export default servicesModule;
