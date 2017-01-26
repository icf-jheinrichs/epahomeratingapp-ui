//TODO: put this in a config somewhere.
const MAX_SAMPLE_SIZE = 7;

class JobDetailController {
    constructor (RATING_TYPES, JobsService) {
        'ngInject';

        this.ratingTypeOptions = RATING_TYPES;
        this.JobsService       = JobsService;
    }

    $onInit () {
        this.isSampleSet = this.job.Secondary.length > 0;

        this.currentLocation = this.job.Primary.HouseId;
    }

    setTab (houseId) {
        this.currentLocation = houseId;
    }

    ariaCurrent (houseId) {
        return this.currentLocation === houseId;
    }

    onSubmit () {
        this.submitJob({
            job : this.job
        });
    }

    addSample () {
        this.job.Secondary.push(this.JobsService.getNewSample());
    }

    get canAddSample () {
        return (this.isSampleSet && this.job.Secondary.length < (MAX_SAMPLE_SIZE - 1));
    }
}

export default JobDetailController;
