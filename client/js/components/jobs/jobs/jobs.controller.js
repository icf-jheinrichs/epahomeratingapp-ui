class JobsController {
    constructor (JobsModel) {
        'ngInject';

        this.JobsModel = JobsModel;
    }

    $onInit () {
        this.JobsModel
            .get()
            .then(jobs => {
                this.jobs = jobs.data;
            });
    }
}

export default JobsController;
