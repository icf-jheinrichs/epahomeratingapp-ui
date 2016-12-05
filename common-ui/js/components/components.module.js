import angular from 'angular';

import CommonModule from './common/common.module';
import JobsModule from './jobs/jobs.module';
import HousePlansModule from './house-plans/house-plans.module';
import UsersModule from './users/users.module';

let componentModule
    = angular
        .module('epahomeratingapp.components', [
            JobsModule.name,
            HousePlansModule.name,
            UsersModule.name,
            CommonModule.name
        ]);

export default componentModule;
