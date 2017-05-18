//TODO: put this in a config somewhere.
const MAX_SAMPLE_SIZE = 7;

class JobDetailController {
    constructor (JobsService, UI_ENUMS) {
        'ngInject';

        this.ratingTypeOptions = UI_ENUMS.RATING_TYPES;
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

    setRatingType (ratingType) {
        this.job.RatingType = ratingType[0];
    }

    addSample () {
        this.job.Secondary.push(this.JobsService.getNewSample());
    }

    handleSampleSetToggleChange (isOn) {
        this.isSampleSet = isOn;
    }

    get canAddSample () {
        return (this.isSampleSet && this.job.Secondary.length < (MAX_SAMPLE_SIZE - 1));
    }
}

export default JobDetailController;
