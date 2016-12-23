import angular from 'angular';

import CommonModule from './common/common.module';
import HousePlansModule from './house-plans/house-plans.module';
import JobsModule from './jobs/jobs.module';
import LoginModule from './login/login.module';
import UsersModule from './users/users.module';

let componentModule
    = angular
        .module('epahomeratingapp.components', [
            CommonModule.name,
            HousePlansModule.name,
            JobsModule.name,
            LoginModule.name,
            UsersModule.name
        ]);

export default componentModule;
