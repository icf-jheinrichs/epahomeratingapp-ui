import angular from 'angular';
import JobsModule from './jobs/jobs.module';

let componentModule
    = angular
        .module('epahomeratingapp.components', [
            JobsModule.name
        ]);

export default componentModule;
