import {UI_ENUMS} from '../../epahomeratingappUI.js';
import _forOwn from 'lodash/forOwn';

let searchParams = [];

_forOwn(UI_ENUMS.SEARCH_PARAMS, (value, key) => {
    searchParams.push(value);
});

let housePlansSearchParams = [];

_forOwn(UI_ENUMS.HOUSE_PLANS_SEARCH_PARAMS, (value, key) => {
    housePlansSearchParams.push(value);
});

const STATE_NAME = UI_ENUMS.STATE_NAME;

let epahomeratingappRoutes = function epahomeratingappRoutes ($stateProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider
        .otherwise(STATE_NAME.LOGIN);

    $stateProvider
        .state(STATE_NAME.LOGIN, {
            url        : '/login',
            component  : 'loginPage',
            data       : {
                requiresAuth : false
            },
            resolve    : {
                returnTo : ($transition$) => {
                    if ($transition$.redirectedFrom() !== null) {
                        // The user was redirected to the login state (e.g., via the requiresAuth hook when trying to activate contacts)
                        // Return to the original attempted target state (e.g., contacts)
                        return $transition$.redirectedFrom().targetState();
                    }

                    let $state = $transition$.router.stateService;

                    // The user was not redirected to the login state; they directly activated the login state somehow.
                    // Return them to the state they came from.
                    if ($transition$.from().name !== '') {
                        return $state.target($transition$.from(), $transition$.params('from'));
                    }

                    // If the fromState's name is empty, then this was the initial transition. Just return them to the home state
                    return $state.target('jobs');
                }
            }
        })

        .state(STATE_NAME.NOT_AUTHORIZED, {
            url        : '/not-authorized',
            component  : 'notAuthorizedPage',
            data       : {
                requiresAuth : false
            }
        })

        .state(STATE_NAME.TEMPLATE_LIBRARY, {
            url        : '/template-library',
            component  : 'housePlansPage',
            resolve    : {
                housePlans : (HousePlansService) => {
                    let housePlansPromise
                        = HousePlansService
                            .get()
                            .then(housePlans => {
                                return housePlans;
                            });

                    return housePlansPromise;
                }
            }
        })

        .state(STATE_NAME.TEMPLATE_LIBRARY_NEW, {
            url       : '/new',
            component : 'housePlanNew'
        })

        .state(STATE_NAME.TEMPLATE_LIBRARY_EDIT, {
            url       : '/{id}',
            component : 'housePlanEdit',
            resolve   : {
                housePlan : (HousePlansService, $stateParams) => {
                    let housePlanPromise
                        = HousePlansService
                            .getById($stateParams.id)
                            .then(housePlan => {
                                return housePlan;
                            });

                    return housePlanPromise;
                }
            }
        })

        .state(STATE_NAME.TEMPLATE_LIBRARY_EDIT_BULK, {
            url       : '/edit-bulk',
            component : 'housePlanEditBulk',
            params    : {
                housePlanIDs : null
            }
        })

        .state(STATE_NAME.TEMPLATE_LIBRARY_SEARCH, {
            url        : `/template-library?${housePlansSearchParams.join('&')}`,
            component  : 'housePlansSearchPage',
            resolve    : {
                housePlans : (HousePlansService, $stateParams) => {
                    let housePlansPromise
                        = HousePlansService
                            .search($stateParams)
                            .then(housePlans => {
                                return housePlans;
                            });

                    return housePlansPromise;
                }
            }
        })

        //TODO Figure out how to get this in a single house plan view
        .state(STATE_NAME.TEMPLATE_LIBRARY_SEARCH_NEW, {
            url       : '/new',
            component : 'housePlanNew'
        })

        .state(STATE_NAME.TEMPLATE_LIBRARY_SEARCH_EDIT, {
            url       : '/{id}',
            component : 'housePlanEdit',
            resolve   : {
                housePlan : (HousePlansService, $stateParams) => {
                    let housePlanPromise
                        = HousePlansService
                            .getById($stateParams.id)
                            .then(housePlan => {
                                return housePlan;
                            });

                    return housePlanPromise;
                }
            }
        })

        .state(STATE_NAME.TEMPLATE_LIBRARY_SEARCH_EDIT_BULK, {
            url       : '/edit-bulk',
            component : 'housePlanEditBulk',
            params    : {
                housePlanIDs : null
            }
        })
        //end house plan repeat

        .state(STATE_NAME.JOBS_PROVIDER, {
            url        : '/jobs/submitted',
            component  : 'jobsProviderPage',
            resolve    : {
                company : (AuthorizationService, UserCompanyService) => {
                    return UserCompanyService.getCompany(AuthorizationService.getCurrentOrganizationId());
                },
                jobs   : (company, JobsService, $stateParams) => {
                    let raterId;

                    if ($stateParams && $stateParams.rater) {
                        raterId = $stateParams.rater;
                    } else if (company.RelatedRaterCompanys.length) {
                        raterId = company.RelatedRaterCompanys[0];
                    }

                    let jobPromise
                        = JobsService
                            .getProviderJobs(raterId)
                            .then(jobs => {
                                return jobs;
                            });

                    return jobPromise;
                }
            }
        })

        .state(STATE_NAME.JOBS_PROVIDER_SEARCH, {
            url        : `/jobs/submitted?${searchParams.join('&')}`,
            component  : 'jobsProviderPage',
            resolve    : {
                company : (AuthorizationService, UserCompanyService) => {
                    return UserCompanyService.getCompany(AuthorizationService.getCurrentOrganizationId());
                },
                jobs   : (JobsService, $stateParams) => {
                    let jobPromise
                        = JobsService
                            .searchProviderJobs($stateParams)
                            .then(jobs => {
                                return jobs;
                            });

                    return jobPromise;
                }
            }
        })


        .state(STATE_NAME.JOBS, {
            url        : '/jobs',
            component  : 'jobsPage',
            resolve    : {
                company : (AuthorizationService, UserCompanyService) => {
                    return UserCompanyService.getCompany(AuthorizationService.getCurrentOrganizationId());
                },
                jobs   : (JobsService) => {
                    let jobPromise
                        = JobsService
                            .get()
                            .then(jobs => {
                                return jobs;
                            });

                    return jobPromise;
                }
            }
        })

        .state(STATE_NAME.JOBS_SEARCH, {
            url        : `/jobs?${searchParams.join('&')}`,
            component  : 'jobsPage',
            resolve    : {
                company : (AuthorizationService, UserCompanyService) => {
                    return UserCompanyService.getCompany(AuthorizationService.getCurrentOrganizationId());
                },
                jobs   : (JobsService, $stateParams) => {
                    let jobPromise
                        = JobsService
                            .search($stateParams)
                            .then(jobs => {
                                return jobs;
                            });

                    return jobPromise;
                }
            }
        })

        .state(STATE_NAME.JOB_NEW, {
            url        : '/jobs/new/',
            component  : 'jobNewPage',
            resolve    : {
                job    : (JobsService) => {
                    return JobsService.getNewJob();
                },
                housePlans : (HousePlansService) => {
                    let housePlansPromise
                        = HousePlansService
                            .get()
                            .then(housePlans => {
                                return housePlans;
                            });

                    return housePlansPromise;
                }
            }
        })

        .state(STATE_NAME.JOB_EDIT, {
            url        : '/jobs/edit/{id}',
            component  : 'jobEditPage',
            resolve    : {
                job    : (JobsService, $stateParams) => {
                    let jobPromise
                        = JobsService
                            .getById($stateParams.id)
                            .then(job => {
                                return job;
                            });

                    return jobPromise;
                },
                housePlans : (HousePlansService) => {
                    let housePlansPromise
                        = HousePlansService
                            .get()
                            .then(housePlans => {
                                return housePlans;
                            });

                    return housePlansPromise;
                }
            }
        })

        .state(STATE_NAME.JOB_CHECKLIST, {
            url        : '/jobs/{id}',
            component  : 'jobChecklistPage',
            resolve    : {
                job : (JobChecklistStateService, $stateParams) => {
                    let jobChecklistStatePromise
                        = JobChecklistStateService
                            .setJobState($stateParams.id, $stateParams.houseId);

                    return jobChecklistStatePromise;
                }
            }
        })

        .state(STATE_NAME.JOB_CHECKLIST_CATEGORY, {
            url        : '/{houseId}/{categoryId}?stageId',
            component  : 'checklistCategory',
            resolve    : {
                jobChecklistState : (JobChecklistStateService, $stateParams) => {
                    let jobChecklistStatePromise
                        = JobChecklistStateService
                            .setJobHouseState($stateParams.id, $stateParams.houseId);

                    return jobChecklistStatePromise;
                }
            }
        })

        .state(STATE_NAME.JOB_CHECKLIST_STATUS, {
            url        : '/{houseId}/status/{statusId}?stageId',
            component  : 'checklistStatus',
            resolve    : {
                jobChecklistState : (JobChecklistStateService, $stateParams) => {
                    let jobChecklistStatePromise
                        = JobChecklistStateService
                            .setJobHouseState($stateParams.id, $stateParams.houseId);

                    return jobChecklistStatePromise;
                }
            }
        })

        .state(STATE_NAME.JOB_CHECKLIST_REVIEW, {
            url        : '/jobs/review/{id}?role&ratingCompanyID',
            component  : 'jobChecklistPage',
            resolve    : {
                job : (JobChecklistStateService, $stateParams) => {
                    let jobChecklistStatePromise
                        = JobChecklistStateService
                            .setJobState($stateParams.id, $stateParams.houseId, $stateParams.ratingCompanyID);

                    return jobChecklistStatePromise;
                }
            }
        })

        .state(STATE_NAME.JOB_CHECKLIST_REVIEW_HISTORY, {
            url        : '/{houseId}/history',
            component  : 'jobHistory',
            resolve    : {
                jobChecklistState : (JobChecklistStateService, $stateParams) => {
                    let jobChecklistStatePromise
                        = JobChecklistStateService
                            .getJobHistory($stateParams.id);

                    return jobChecklistStatePromise;
                }
            }
        })

        .state(STATE_NAME.JOB_CHECKLIST_REVIEW_CATEGORY, {
            url        : '/{houseId}/{categoryId}',
            component  : 'checklistCategory',
            resolve    : {
                jobChecklistState : (JobChecklistStateService, $stateParams) => {
                    let jobChecklistStatePromise
                        = JobChecklistStateService
                            .setJobHouseState($stateParams.id, $stateParams.houseId, $stateParams.ratingCompanyID);

                    return jobChecklistStatePromise;
                }
            }
        })

        .state(STATE_NAME.PROVIDERS, {
            url        : '/providers',
            component  : 'providersPage'
        })

        .state(STATE_NAME.USERS, {
            url        : '/users',
            component  : 'usersPage'
        })

        .state(STATE_NAME.USER_EDIT, {
            url        : '/users/user/{C_ID}',
            component  : 'userEditPage',
            resolve    : {
                user : (UserCompanyService, $stateParams) => {
                    return UserCompanyService.getUser($stateParams.C_ID);
                }
            }
        })

        .state(STATE_NAME.USER_RESET_PASSWORD, {
            url        : '/users/reset-password',
            component  : 'userResetPasswordPage',
            data       : {
                requiresAuth : false
            }
        })

        .state(STATE_NAME.USER_REGISTER, {
            url        : '/users/register/{C_ID}',
            component  : 'userRegisterPage',
            data       : {
                requiresAuth : false
            }
        })

        .state(STATE_NAME.USER_SETTINGS, {
            url        : '/users/user/settings',
            component  : 'userSettingsPage'
        })

        .state(STATE_NAME.PRIVACY_POLICY, {
            url        : '/privacy-policy',
            component  : 'privacyPolicyPage',
            data       : {
                requiresAuth : false
            }
        });
};

export default epahomeratingappRoutes;
