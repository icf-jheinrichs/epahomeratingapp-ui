import angular from 'angular';

import jobAdminComponent from './job-admin/job-admin.component';
import jobRaterComponent from './job-rater/job-rater.component';
import jobInactiveComponent from './job-inactive/job-inactive.component';
import jobProviderComponent from './job-provider/job-provider.component';

import './job.scss';

let jobModule
    = angular
        .module('epahomeratingapp.components.jobs.job', [
        ])
        .component('jobAdmin', jobAdminComponent)
        .component('jobRater', jobRaterComponent)
        .component('jobInactive', jobInactiveComponent)
        .component('jobProvider', jobProviderComponent);

export default jobModule;
