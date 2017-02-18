const ERROR_SERVER = {
    type        : 'error',
    text        : 'There was an error processing your request. Please try again.',
    dismissable : false
};

const SUCCESS = {
    type        : 'success',
    text        : 'Job Created.',
    dismissable : false
};

const HOUSE_PLAN_REQUIRED = {
    type        : 'error',
    text        : 'Please add a House Plan to all samples.',
    dismissable : false
};

class JobsNewPageController {
    constructor ($state, JobsService) {
        'ngInject';

        this.$state = $state;
        this.JobsService = JobsService;
    }

    $onInit () {
        this.message = {};
    }

    housePlansAreValid (job) {
        let housePlansValid = true;

        if (job.Primary.HousePlan.length < 1) {
            housePlansValid = false;
        }

        job.Secondary.forEach((location) => {
            if (location.HousePlan.length < 1) {
                housePlansValid = false;
            }
        });

        return housePlansValid;
    }

    submitJob (job) {
        this.message = {};

        if (this.housePlansAreValid(job)) {
            this.isBusy = true;

            this.JobsService
                .post(job)
                .then(response => {
                    this.message = Object.assign({}, SUCCESS);
                    this.$state.go('jobs');
                })
                .catch(error => {
                    this.message = Object.assign({}, ERROR_SERVER);
                })
                .finally(() => {
                    this.isBusy = false;
                });
        } else {
            this.message = Object.assign({}, HOUSE_PLAN_REQUIRED);
        }
    }
}

export default JobsNewPageController;
