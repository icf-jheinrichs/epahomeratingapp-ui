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
                    let jobsPromise
                        = JobsService
                            .getById($stateParams.id)
                            .then(job => {
                                return job.data;
                            });

                    return jobsPromise;
                }
            }
        })

        .state('job-checklist.category', {
            url        : '/{houseId}/{categoryId}',
            component  : 'checklistCategory'
        });
};

export default epahomeratingappRoutes;
