import housePlansPageComponent from './house-plans-page/house-plans-page.component';
import jobsPageComponent from './jobs-page/jobs-page.component';
import jobChecklistPageComponent from './job-checklist-page/job-checklist-page.component';
import jobEditPageComponent from './job-edit-page/job-edit-page.component';
import jobNewPageComponent from './job-new-page/job-new-page.component';
import loginPageComponent from './login-page/login-page.component';
import registerPageComponent from './register-page/register-page.component';
import usersPageComponent from './users-page/users-page.component';
import diagnosticsPageComponent from './diagnostics-page/diagnostics-page.component';

let servicesModule
    = angular
        .module('epahomeratingapp.pages', [])
        .component('housePlansPage', housePlansPageComponent)
        .component('jobsPage', jobsPageComponent)
        .component('jobChecklistPage', jobChecklistPageComponent)
        .component('jobEditPage', jobEditPageComponent)
        .component('jobNewPage', jobNewPageComponent)
        .component('loginPage', loginPageComponent)
        .component('registerPage', registerPageComponent)
        .component('usersPage', usersPageComponent)
        .component('diagnosticsPage', diagnosticsPageComponent);

export default servicesModule;
