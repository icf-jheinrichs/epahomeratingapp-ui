class JobController {
    constructor ($log) {
        'ngInject';

        this.$log = $log;
    }

    getRatingTypeClass () {
        return 'label-energy-star';
    }

    hasStatusLabel () {
        return (this.job.ReturnedFromInternal || this.job.ReturnedFromProvider);
    }
}

export default JobController;
