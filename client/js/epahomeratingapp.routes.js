let epahomeratingappRoutes = function epahomeratingappRoutes ($stateProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider
        .otherwise('/jobs');

    $stateProvider
        .state('jobs', {
            url        : '/jobs',
            component  : 'jobsPage',
            resolve    : {
                jobs   : (JobsService) => {
                    let jobPromise
                        = JobsService
                            .get()
                            .then(jobs => {
                                return jobs.data;
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
                    let jobPromise
                        = JobsService
                            .getNewJob()
                            .then(job => {
                                return Object.assign({}, job);
                            });

                    return jobPromise;
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
                                return job.data;
                            });

                    return jobPromise;
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
                                return job.data;
                            });

                    return jobPromise;
                },
                jobDisplayList : (JobDisplayListService, $stateParams) => {
                    let jobDisplayListPromise
                        = JobDisplayListService
                            .getById($stateParams.id)
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
                }
            }
        })

        .state('job-checklist.category', {
            url        : '/{houseId}/{categoryId}',
            component  : 'checklistCategory'
        });
};

export default epahomeratingappRoutes;
