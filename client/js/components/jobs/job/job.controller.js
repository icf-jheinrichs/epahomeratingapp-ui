class JobController {
    constructor ($log) {
        'ngInject';

        this.$log = $log;
    }

    getRatingTypeClass () {
        //TODO: make this better
        return (this.job.RatingType === 'Energy Star') ? 'label-energy-star' : 'label-hers-rating';
    }

    hasStatusLabel () {
        return (this.job.ReturnedFromInternal || this.job.ReturnedFromProvider);
    }

    isSample () {
        return this.job.JobType === 'Sample';
    }
}

export default JobController;
