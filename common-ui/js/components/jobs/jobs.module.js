import angular from 'angular';

import jobModule from './job/job.module';
import jobsComponent from './jobs/jobs.component';
import jobDetailComponent from './job-detail/job-detail.component';
import jobDetailLocationComponent from './job-detail/job-detail-location/job-detail-location.component';
import jobChecklistComponent from './job-checklist/job-checklist.component';
import JobChecklistModule from './job-checklist/job-checklist.module';
import jobOverviewComponent from './job-overview/job-overview.component';
import jobHistoryComponent from './job-history/job-history.component';
import jobHistoryMapComponent from './job-history/job-history-map/job-history-map.component';
import jobsSearchModule from './jobs-search/jobs-search.module';
import jobSyncStatusComponent from './jobs/job-sync-status/job-sync-status.component';

let jobsModule
    = angular
        .module('epahomeratingapp.components.jobs', [
            jobModule.name,
            JobChecklistModule.name,
            jobsSearchModule.name
        ])
        .component('jobs', jobsComponent)
        .component('jobDetail', jobDetailComponent)
        .component('jobDetailLocation', jobDetailLocationComponent)
        .component('jobChecklist', jobChecklistComponent)
        .component('jobChecklist', jobChecklistComponent)
        .component('jobHistory', jobHistoryComponent)
        .component('jobHistoryMap', jobHistoryMapComponent)
        .component('jobOverview', jobOverviewComponent)
        .component('jobSyncStatus', jobSyncStatusComponent);

export default jobsModule;
