import angular from 'angular';
import JobsService from './jobs.service';
import DisplayLogicDigestService from './display-logic-digest.service';

let servicesModule
    = angular
        .module('epahomeratingapp.services', [])
            .service('JobsService', JobsService)
            .service('DisplayLogicDigestService', DisplayLogicDigestService);

export default servicesModule;
