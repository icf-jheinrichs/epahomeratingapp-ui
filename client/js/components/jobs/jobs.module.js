import angular from 'angular';
import jobsComponent from './jobs/jobs.component';
import jobComponent from './job/job.component';
import jobEditComponent from './job-edit/job-edit.component';
import jobNewComponent from './job-new/job-new.component';
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
        .component('jobEdit', jobEditComponent)
        .component('jobNew', jobNewComponent)
        .component('jobDetail', jobDetailComponent)
        .component('jobChecklist', jobChecklistComponent);

export default jobsModule;
