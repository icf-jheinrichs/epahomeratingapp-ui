class JobChecklistController {
    constructor ($stateParams, JobsModel, JobChecklistModel) {
        'ngInject';

        this._id = $stateParams._id;
        this.JobsModel         = JobsModel;
        this.JobChecklistModel = JobChecklistModel;
    }

    getRatingTypeClass () {
        //TODO: make this better
        return (this.job && this.job.RatingType === 'Energy Star') ? 'label-energy-star' : 'label-hers-rating';
    }

    $onInit () {
        this.JobsModel
            .getById(this._id)
            .then(job => {
                this.job = job.data;
            });

        this.JobChecklistModel
            .get()
            .then(checklist => {
                this.checklist = checklist;
            });
    }
}

export default JobChecklistController;
