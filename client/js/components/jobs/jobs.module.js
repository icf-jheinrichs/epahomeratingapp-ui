import angular from 'angular';
import jobsComponent from './jobs/jobs.component.js';
import jobComponent from './job/job.component.js';
import jobEditComponent from './job-edit/job-edit.component.js';
import jobNewComponent from './job-new/job-new.component.js';
import jobDetailComponent from './job-detail/job-detail.component.js';
import jobChecklistComponent from './job-checklist/job-checklist.component.js';

let componentModule
    = angular
        .module('epahomeratingapp.components.jobs', [])
        .component('jobs', jobsComponent)
        .component('job', jobComponent)
        .component('jobEdit', jobEditComponent)
        .component('jobNew', jobNewComponent)
        .component('jobDetail', jobDetailComponent)
        .component('jobChecklist', jobChecklistComponent);

export default componentModule;
