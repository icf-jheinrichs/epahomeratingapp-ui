const ERROR_SERVER = {
    type        : 'error',
    text        : 'There was an error processing your request. Please try again.',
    dismissable : false
};

const SUCCESS = {
    type        : 'error',
    text        : 'Job Created.',
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

    submitJob (job) {
        this.message = {};

        this.JobsService
            .post(job)
            .then(response => {
                this.message = Object.assign({}, SUCCESS);
            })
            .catch(error => {
                this.message = Object.assign({}, ERROR_SERVER);
            });
    }
}

export default JobsNewPageController;
