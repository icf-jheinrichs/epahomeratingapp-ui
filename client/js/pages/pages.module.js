import housePlansPageComponent from './house-plans-page/house-plans-page.component';
import jobsPageComponent from './jobs-page/jobs-page.component';
import jobChecklistPageComponent from './job-checklist-page/job-checklist-page.component';
import jobEditPageComponent from './job-edit-page/job-edit-page.component';
import jobNewPageComponent from './job-new-page/job-new-page.component';
import usersPageComponent from './users-page/users-page.component';

let servicesModule
    = angular
        .module('epahomeratingapp.pages', [])
            .component('housePlansPage', housePlansPageComponent)
            .component('jobsPage', jobsPageComponent)
            .component('jobChecklistPage', jobChecklistPageComponent)
            .component('jobEditPage', jobEditPageComponent)
            .component('jobNewPage', jobNewPageComponent)
            .component('usersPage', usersPageComponent);

export default servicesModule;
