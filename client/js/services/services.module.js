import angular from 'angular';
import CameraService from './camera.service';
import JobsService from './jobs.service';
import DisplayLogicDigestService from './display-logic-digest.service';

let servicesModule
    = angular
        .module('epahomeratingapp.services', [])
            .service('CameraService', CameraService)
            .service('JobsService', JobsService)
            .service('DisplayLogicDigestService', DisplayLogicDigestService);

export default servicesModule;
