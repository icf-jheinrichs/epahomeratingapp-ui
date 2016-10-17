let epahomeratingappRoutes = function epahomeratingappRoutes ($stateProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider
        .otherwise('/jobs');

    $stateProvider
        .state('jobs', {
            url        : '/jobs',
            component  : 'jobs'
        })

        .state('job-new', {
            url        : '/jobs/new',
            component  : 'jobNew'
        })

        .state('job-checklist', {
            url        : '/jobs/{id}',
            component  : 'jobChecklist',
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
