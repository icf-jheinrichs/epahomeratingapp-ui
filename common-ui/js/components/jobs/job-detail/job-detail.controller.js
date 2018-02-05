//TODO: put this in a config somewhere.
const MAX_SAMPLE_SIZE = 7;

import _findIndex from 'lodash/findIndex';

class JobDetailController {
    constructor ($state, DialogService, JobsService, UI_ENUMS) {
        'ngInject';

        this.context           = $state.current.name === UI_ENUMS.STATE_NAME.JOB_NEW ? 'new' : 'edit';

        this.ratingTypeOptions = UI_ENUMS.RATING_TYPES;
        this.DialogService     = DialogService;
        this.JobsService       = JobsService;

        this.DIALOG            = UI_ENUMS.DIALOG.CONFIRM_CHANGE_SAMPLE_SET;
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

    onCancel () {
        window.history.back();
    }

    setRatingType (ratingType) {
        this.job.RatingType = ratingType[0];
    }

    addSample () {
        this.job.Secondary.push(this.JobsService.getNewSample());

        this.setTab(this.job.Secondary[this.job.Secondary.length - 1].HouseId);
    }

    deleteSample () {
        let index = _findIndex(this.job.Secondary, {HouseId : this.currentLocation});

        if (index === 0) {
            this.setTab(this.job.Primary.HouseId);
        } else {
            this.setTab(this.job.Secondary[index - 1].HouseId);
        }

        this.job.Secondary.splice(index, 1);
    }

    clearAllSamples () {
        this.setTab(this.job.Primary.HouseId);

        this.job.Secondary = [];
    }

    handleSampleSetToggleChange (isOn) {
        if (this.isSampleSet && !isOn) {
            this.clearAllSamples();
        }
        this.isSampleSet = isOn;
    }

    get canAddSample () {
        return (this.isSampleSet && this.job.Secondary.length < (MAX_SAMPLE_SIZE - 1));
    }

    get canDeleteLocation () {
        if (this.context !== 'new' || this.currentLocation === this.job.Primary.HouseId) {
            return false;
        }

        return true;
    }
}

export default JobDetailController;
