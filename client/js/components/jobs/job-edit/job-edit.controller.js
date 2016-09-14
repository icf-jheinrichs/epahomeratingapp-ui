class JobEditController {
    constructor ($stateParams, JobsModel) {
        'ngInject';

        this._id = $stateParams._id;
        this.JobsModel = JobsModel;
    }

    $onInit () {
        this.JobsModel
            .getById(this._id)
            .then(job => {
                this.job = job.data;
            });
    }
}

export default JobEditController;
