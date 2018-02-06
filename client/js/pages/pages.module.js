import homePageComponent from './home-page/home-page.component';
import housePlansPageComponent from './house-plans-page/house-plans-page.component';
import housePlansSearchPageComponent from './house-plans-search-page/house-plans-search-page.component';
import jobsPageComponent from './jobs-page/jobs-page.component';
import jobChecklistPageComponent from './job-checklist-page/job-checklist-page.component';
import jobEditPageComponent from './job-edit-page/job-edit-page.component';
import jobNewPageComponent from './job-new-page/job-new-page.component';
import jobsProviderPageComponent from './jobs-provider-page/jobs-provider-page.component';
import loginPageComponent from './login-page/login-page.component';
import providersPageComponent from './providers-page/providers-page.component';
import userSettingsPageComponent from './user-settings-page/user-settings-page.component';
import usersPageComponent from './users-page/users-page.component';
import userEditPageComponent from './user-edit-page/user-edit-page.component';

let servicesModule
    = angular
        .module('epahomeratingapp.pages', [])
        .component('homePage', homePageComponent)
        .component('housePlansPage', housePlansPageComponent)
        .component('housePlansSearchPage', housePlansSearchPageComponent)
        .component('jobsPage', jobsPageComponent)
        .component('jobChecklistPage', jobChecklistPageComponent)
        .component('jobEditPage', jobEditPageComponent)
        .component('jobNewPage', jobNewPageComponent)
        .component('jobsProviderPage', jobsProviderPageComponent)
        .component('loginPage', loginPageComponent)
        .component('providersPage', providersPageComponent)
        .component('userSettingsPage', userSettingsPageComponent)
        .component('usersPage', usersPageComponent)
        .component('userEditPage', userEditPageComponent);

export default servicesModule;
