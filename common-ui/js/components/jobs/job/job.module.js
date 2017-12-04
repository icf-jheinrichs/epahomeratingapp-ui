import angular from 'angular';

import jobAdminComponent from './job-admin/job-admin.component';
import jobRaterComponent from './job-rater/job-rater.component';
import jobProviderComponent from './job-provider/job-provider.component';

let jobModule
    = angular
        .module('epahomeratingapp.components.jobs.job', [
        ])
        .component('jobAdmin', jobAdminComponent)
        .component('jobRater', jobRaterComponent)
        .component('jobProvider', jobProviderComponent);

export default jobModule;
