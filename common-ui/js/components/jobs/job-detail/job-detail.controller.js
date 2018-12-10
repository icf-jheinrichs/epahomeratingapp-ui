/* global File */

//TODO: put this in a config somewhere.
const MAX_SAMPLE_SIZE = 7;

import _findIndex from 'lodash/findIndex';

class JobDetailController {
    constructor ($state, DialogService, JobsService, UI_ENUMS) {
        'ngInject';

        this.context           = $state.current.name === UI_ENUMS.STATE_NAME.JOB_NEW ? 'new' : 'edit';
        this.JOB_STATUS        = UI_ENUMS.JOB_STATUS;

        this.ratingTypeOptions = UI_ENUMS.RATING_TYPES;
        this.DialogService     = DialogService;
        this.JobsService       = JobsService;

        this.DIALOG            = UI_ENUMS.DIALOG.CONFIRM_CHANGE_SAMPLE_SET;
    }

    $onInit () {
        this.isSampleSet       = this.job.Secondary.length > 0;
        this.currentLocation   = this.job.Primary.HouseId;

        const ratingStarted    = this.ratingStarted(this.job);
        this.canEditSampleSet  = !ratingStarted;
        this.canEditRatingType = !ratingStarted;
        this.canEditHouesPlans = !ratingStarted;
    }

    ratingStarted (job) {
        const progress = job.Progress;
        let total      = 0;

        if (job.JobInitiated) {
            return true;
        }

        if (!progress) {
            return false;
        }

        total += progress.PreDrywall.MustCorrect;
        total += progress.PreDrywall.Verified;

        total += progress.Final.MustCorrect;
        total += progress.Final.Verified;

        return total > 0;
    }

    setTab (houseId) {
        this.currentLocation = houseId;
    }

    ariaCurrent (houseId) {
        return this.currentLocation === houseId;
    }

    /**
     * Check if file is PDF and less than 2 MB
     * @param  {File}      file file to validify
     * @return {Boolean}   validity
     */
    //TODO make DRY
    isValidFile (file) {
        return file.type === 'application/pdf' && ((file.size / 1048576) < 2);
    }

    filterErrantFiles () {
        this.job
            .Primary
            .HvacDesignReport
            = this.job
                    .Primary
                    .HvacDesignReport
                    .filter((hvacDesignReport) => {
                        return hvacDesignReport instanceof File && this.isValidFile(hvacDesignReport);
                    });

        this.job
            .Primary
            .RaterDesignReviewChecklist
            = this.job
                    .Primary
                    .RaterDesignReviewChecklist
                    .filter((raterDesignReviewChecklist) => {
                        return raterDesignReviewChecklist instanceof File && this.isValidFile(raterDesignReviewChecklist);
                    });

        this.job
            .Secondary
            .forEach((location, locationIndex) => {
                this.job
                    .Secondary[locationIndex]
                    .HvacDesignReport
                    = location
                            .HvacDesignReport
                            .filter((hvacDesignReport) => {
                                return hvacDesignReport instanceof File && this.isValidFile(hvacDesignReport);
                            });

                this.job
                    .Secondary[locationIndex]
                    .RaterDesignReviewChecklist
                    = location
                            .RaterDesignReviewChecklist
                            .filter((raterDesignReviewChecklist) => {
                                return raterDesignReviewChecklist instanceof File && this.isValidFile(raterDesignReviewChecklist);
                            });
            });
    }

    onSubmit () {
        this.filterErrantFiles();

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
        if (!this.canAddSample) {
            return;
        }

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
        return this.currentLocation !== this.job.Primary.HouseId;
    }
}

export default JobDetailController;
