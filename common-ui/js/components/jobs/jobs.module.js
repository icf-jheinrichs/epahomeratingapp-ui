import angular from 'angular';

import jobsComponent from './jobs/jobs.component';
import jobComponent from './job/job.component';
import jobDetailComponent from './job-detail/job-detail.component';
import jobChecklistComponent from './job-checklist/job-checklist.component';
import JobChecklistModule from './job-checklist/job-checklist.module';

let jobsModule
    = angular
        .module('epahomeratingapp.components.jobs', [
            JobChecklistModule.name
        ])
        .component('jobs', jobsComponent)
        .component('job', jobComponent)
        .component('jobDetail', jobDetailComponent)
        .component('jobChecklist', jobChecklistComponent);

export default jobsModule;
