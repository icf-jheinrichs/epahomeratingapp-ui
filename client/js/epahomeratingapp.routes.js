let epahomeratingappRoutes = function epahomeratingappRoutes ($stateProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider
        .otherwise('/login');

    $stateProvider
        .state('login', {
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

        .state('register', {
            url        : '/register',
            component  : 'registerPage',
            data       : {
                requiresAuth : false
            }
        })

        .state('house-plans', {
            url        : '/house-plans',
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

        .state('house-plans.new', {
            url       : '/new',
            component : 'housePlanNew'
        })

        .state('house-plans.edit', {
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

        .state('jobs', {
            url        : '/jobs',
            component  : 'jobsPage',
            resolve    : {
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

        .state('job-new', {
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

        .state('job-edit', {
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

        .state('job-checklist', {
            url        : '/jobs/{id}',
            component  : 'jobChecklistPage',
            resolve    : {
                job : (JobsService, $stateParams) => {
                    let jobPromise
                        = JobsService
                            .getById($stateParams.id)
                            .then(job => {
                                return job;
                            });

                    return jobPromise;
                },
                jobDisplayList : (job, JobDisplayListService, $stateParams) => {
                    let houseIds = [job.Primary.HousePlan[0]._id];

                    if (job.Secondary.length > 0) {
                        job.Secondary.forEach(house => {
                            houseIds.push(house.HousePlan[0]._id);
                        });
                    }

                    let jobDisplayListPromise
                        = JobDisplayListService
                            .getById(houseIds)
                            .then(jobDisplayList => {
                                return jobDisplayList;
                            });

                    return jobDisplayListPromise;
                },
                jobDataResponse : (JobDataResponseService, $stateParams) => {
                    let jobDataResponsePromise
                        = JobDataResponseService
                            .getById($stateParams.id)
                            .then(jobDataResponse => {
                                return jobDataResponse;
                            });

                    return jobDataResponsePromise;
                },
                jobChecklistState : (JobChecklistStateService, $stateParams) => {
                    let jobChecklistStatePromise
                        = JobChecklistStateService
                            .setJobState($stateParams.id, $stateParams.houseId);

                    return jobChecklistStatePromise;
                }
            }
        })

        .state('job-checklist.category', {
            url        : '/{houseId}/{categoryId}?status',
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

        .state('job-checklist.stage', {
            url        : '/{houseId}/stage/{stageId}?status',
            component  : 'checklistStage',
            resolve    : {
                jobChecklistState : (JobChecklistStateService, $stateParams) => {
                    let jobChecklistStatePromise
                        = JobChecklistStateService
                            .setJobHouseState($stateParams.id, $stateParams.houseId);

                    return jobChecklistStatePromise;
                }
            }
        })

        .state('users', {
            url        : '/users',
            component  : 'usersPage'
        });
};

export default epahomeratingappRoutes;
