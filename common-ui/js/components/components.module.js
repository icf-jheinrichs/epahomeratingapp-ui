import angular from 'angular';

import JobsModule from './jobs/jobs.module';
import CommonModule from './common/common.module';

let componentModule
    = angular
        .module('epahomeratingapp.components', [
            JobsModule.name,
            CommonModule.name
        ]);

export default componentModule;
