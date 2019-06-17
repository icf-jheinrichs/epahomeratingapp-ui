import homePageComponent from './home-page/home-page.component';
import housePlansPageComponent from './house-plans-page/house-plans-page.component';
import housePlansSearchPageComponent from './house-plans-search-page/house-plans-search-page.component';
import jobsPageComponent from './jobs-page/jobs-page.component';
import jobChecklistPageComponent from './job-checklist-page/job-checklist-page.component';
import jobEditPageComponent from './job-edit-page/job-edit-page.component';
import jobNewPageComponent from './job-new-page/job-new-page.component';
import jobsProviderPageComponent from './jobs-provider-page/jobs-provider-page.component';
import loginPageComponent from './login-page/login-page.component';
import notAuthorizedPageComponent from './not-authorized-page/not-authorized-page.component';
import ratingCompaniesPageComponent from './rating-companies-page/rating-companies-page.component';
import privacyPolicyPageComponent from './privacy-policy-page/privacy-policy-page.component';
import supportPageComponent from './support-page/support-page.component';
import supportUserGuidePageComponent from './support-page/user-guide-page/user-guide-page.component';
import supportUserGuideDesktopPageComponent from './support-page/desktop-page/desktop-page.component';
import supportUserGuideMobilePageComponent from './support-page/mobile-page/mobile-page.component';
import supportUserGuideProviderPageComponent from './support-page/provider-page/provider-page.component';
import supportFaqPageComponent from './support-page/faq-page/faq-page.component';
import providersPageComponent from './providers-page/providers-page.component';
import userSettingsPageComponent from './user-settings-page/user-settings-page.component';
import usersPageComponent from './users-page/users-page.component';
import userRegisterPageComponent from './user-register-page/user-register-page.component';
import userResetPasswordPageComponent from './user-reset-password-page/user-reset-password-page.component';

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
        .component('notAuthorizedPage', notAuthorizedPageComponent)
        .component('ratingCompaniesPage', ratingCompaniesPageComponent)
        .component('privacyPolicyPage', privacyPolicyPageComponent)
        .component('supportPage', supportPageComponent)
        .component('supportUserGuidePage', supportUserGuidePageComponent)
        .component('supportUserGuideDesktopPage', supportUserGuideDesktopPageComponent)
        .component('supportUserGuideMobilePage', supportUserGuideMobilePageComponent)
        .component('supportUserGuideProviderPage', supportUserGuideProviderPageComponent)
        .component('supportFaqPage', supportFaqPageComponent)
        .component('providersPage', providersPageComponent)
        .component('userSettingsPage', userSettingsPageComponent)
        .component('usersPage', usersPageComponent)
        .component('userRegisterPage', userRegisterPageComponent)
        .component('userResetPasswordPage', userResetPasswordPageComponent);

export default servicesModule;
