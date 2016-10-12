class JobsController {
    constructor (JobsService) {
        'ngInject';

        this.JobsService = JobsService;
        this.filterCriteria = 'Jobs';
    }

    $onInit () {
        this.JobsService
            .get()
            .then(jobs => {
                this.jobs = jobs.data;
            });
    }
}

export default JobsController;
