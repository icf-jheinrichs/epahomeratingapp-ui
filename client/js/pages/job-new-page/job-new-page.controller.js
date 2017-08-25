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
    constructor ($q, $log, $state, JobsService, HousePlansService) {
        'ngInject';

        this.$q = $q;
        this.$log = $log;
        this.$state = $state;
        this.JobsService = JobsService;
        this.HousePlansService = HousePlansService;
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

            if (job.Primary.HousePlan[0] instanceof File) {
                this.sumbitJobWithLocalHousePlan(job);
            } else {
                this.submitJobWithLibrarayHousePlan(job);
            }
        } else {
            this.message = Object.assign({}, HOUSE_PLAN_REQUIRED);
        }
    }

    submitJobWithLibrarayHousePlan (job) {
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
    }

    sumbitJobWithLocalHousePlan (job) {
        this.$log.log('Uploading House Plan');

        this.uploadLocalHousePlan (job.Primary.HousePlan)
            .then(response => {
                let HousePlan = [];
                for (let index in response) {
                    HousePlan.push({
                        _id  : response[index].data.docID,
                        Name : response[index].data.buildingName
                    });
                }

                job.Primary.HousePlan = HousePlan;
                this.$log.log('Posting Job');
                return this.JobsService.post(job);
            })
            .then(response => {
                this.message = Object.assign({}, SUCCESS);
                this.$state.go('jobs');
            })
            .catch(error => {
                this.$log.log('Create job with local house plan error');
                this.$log.log(error);
                this.message = Object.assign({}, ERROR_SERVER);
            });
    }

    // upload house plan as temp use
    uploadLocalHousePlan (files) {
        let uploadLocalHousePlanPromises = [];
        let self = this;

        function uploadSingle (file) {
            let formData = new window.FormData();
            formData.append('filedata', file, file.name);

            return self.HousePlansService.post(formData, 'temporary');
        }

        files.forEach(file => {
            uploadLocalHousePlanPromises.push(uploadSingle(file));
        });

        return this.$q.all(uploadLocalHousePlanPromises);
    }
}

export default JobsNewPageController;
