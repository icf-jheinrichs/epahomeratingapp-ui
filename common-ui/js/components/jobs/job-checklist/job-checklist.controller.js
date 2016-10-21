import _ from 'lodash';

class JobChecklistController {
    constructor ($rootScope, JobsService, JobDataResponseService, JOB_STATUS, RESPONSES) {
        'ngInject';

        this.$rootScope             = $rootScope;

        this.JobsService            = JobsService;
        this.JobDataResponseService = JobDataResponseService;
        this.RESPONSES              = RESPONSES;
        this.JOB_STATUS             = JOB_STATUS;

        //TODO: make enum w/ all messaging names.
        this.responseListener = this.$rootScope.$on('setResponse', (event, response) => {
            this.onSetResponse(response);
        });

        this.postCommentListener = this.$rootScope.$on('postComment', (event, comment) => {
            this.onPostComment(comment);
        });
    }

    $onInit () {
        //TODO: make this better
        this.RatingTypeLabel = (this.job.RatingType === 'energy-star') ? 'Energy Star' : 'HERS Rating';

        this.houses              = {
            Primary   : this.job.Primary,
            Secondary : this.job.Secondary
        };

        this.jobIsActive = (this.job.Status === this.JOB_STATUS.ACTIVE);

        //TODO: this belongs in a directive
        this.showActionsDropDown = false;
        this.showCompleteModal   = false;

        this.checklistItemsQuantity = this.job.Progress.PreDrywall.Total + this.job.Progress.Final.Total;
        this.setProgressStatus();
    }

    $onDestroy () {
        // deregister listeners
        this.responseListener();
        this.postCommentListener();
    }

    getRatingTypeClass () {
        //TODO: make this better
        return (this.job.RatingType === 'energy-star') ? 'label-energy-star' : 'label-hers-rating';
    }

    onUpdateHousePhoto (HouseId, photo) {
        let secondaryIndex;

        if (this.job.Primary.HouseId === HouseId) {
            this.job.Primary.Photo = [photo];
        } else {
            secondaryIndex = _.findIndex(this.job.Secondary, {HouseId : HouseId});

            this.job.Secondary[secondaryIndex].Photo = [photo];
        }

        //TODO: put this into a method
        this
            .JobsService
            .put(this.job);
    }

    onSetResponse (response) {
        let updateResponse = (response.Response.length === 0) ? undefined : response.Response;

        this.updateChecklistResponseTotals(response);
        this.updateJobResponseTotals();
        this.setProgressStatus();

        this.jobDataResponse.ChecklistItems[response.Category][response.CategoryProgress][response.ItemId].Response = updateResponse;

        //TODO: put this into a method
        this
            .JobDataResponseService
            .put(this.jobDataResponse);

        //TODO: put this into a method
        this
            .JobsService
            .put(this.job);
    }

    onPostComment (comment) {
        this.jobDataResponse.ChecklistItems[comment.Category][comment.CategoryProgress][comment.ItemId].Comments.push(comment.Comment);

        //TODO: put this into a method
        this
            .JobDataResponseService
            .put(this.jobDataResponse);
    }

    //TODO: all dropdown stuff belongs in a directive
    toggleDropDown () {
        this.showActionsDropDown = !this.showActionsDropDown;
    }

    //TODO: all dropdown stuff belongs in a directive
    hideDropDown () {
        this.showActionsDropDown = false;
    }

    //TODO: all dropdown stuff belongs in a directive
    toggleModal () {
        this.showCompleteModal = !this.showCompleteModal;
    }

    //TODO: all dropdown stuff belongs in a directive
    hideModal () {
        this.showCompleteModal = false;
    }

    completeJob () {
        if (this.totalRemaining === 0 && this.mustCorrectItems === 0) {
            this.job.Status = this.JOB_STATUS.INTERNAL_REVIEW;
            this.jobIsActive = false;

            //TODO: put this into a method
            this
                .JobsService
                .put(this.job);

        } else {
            this.showCompleteModal = true;
        }
    }

    setProgressStatus () {
        let jobProgress = this.job.Progress;

        let totalChecklistItems   = jobProgress.PreDrywall.Total + jobProgress.Final.Total;
        let verifiedItems         = jobProgress.PreDrywall.Verified + jobProgress.Final.Verified;
        let mustCorrectItems      = jobProgress.PreDrywall.MustCorrect + jobProgress.Final.MustCorrect;

        this.mustCorrectItems = mustCorrectItems;
        this.totalRemaining   = (totalChecklistItems) - (verifiedItems + mustCorrectItems);
    }

    updateChecklistResponseTotals (response) {
        let currentResponse = this.jobDataResponse.ChecklistItems[response.Category][response.CategoryProgress][response.ItemId].Response;
        let currentResponseValue = (currentResponse === undefined) ? currentResponse : currentResponse[0];

        let updateResponse = response.Response[0];

        if (currentResponseValue === undefined && updateResponse === this.RESPONSES.MustCorrect.Key) {
            this.jobDataResponse.Progress[response.Category][response.CategoryProgress].MustCorrect += 1;
        } else if (currentResponseValue === undefined) {
            this.jobDataResponse.Progress[response.Category][response.CategoryProgress].Verified += 1;
        } else if (currentResponseValue === this.RESPONSES.MustCorrect.Key && updateResponse !== this.RESPONSES.MustCorrect.Key) {
            this.jobDataResponse.Progress[response.Category][response.CategoryProgress].MustCorrect -= 1;
            this.jobDataResponse.Progress[response.Category][response.CategoryProgress].Verified += 1;
        } else if (currentResponseValue !== this.RESPONSES.MustCorrect.Key && updateResponse === this.RESPONSES.MustCorrect.Key) {
            this.jobDataResponse.Progress[response.Category][response.CategoryProgress].Verified -= 1;
            this.jobDataResponse.Progress[response.Category][response.CategoryProgress].MustCorrect += 1;
        } else if (currentResponseValue === this.RESPONSES.MustCorrect.Key && updateResponse === undefined) {
            this.jobDataResponse.Progress[response.Category][response.CategoryProgress].MustCorrect -= 1;
        } else if (currentResponseValue !== this.RESPONSES.MustCorrect.Key && updateResponse === undefined) {
            this.jobDataResponse.Progress[response.Category][response.CategoryProgress].Verified -= 1;
        }

        this.$rootScope.$broadcast('updateChecklistResponseTotals', this.jobDataResponse.Progress);
    }

    updateJobResponseTotals (response) {
        let jobProgress = this.job.Progress;
        let jobChecklistResponseProgress = this.jobDataResponse.Progress;

        jobProgress.PreDrywall.Verified = 0;
        _.forEach(jobChecklistResponseProgress, function sumPreDrywallVerified (value) {
            jobProgress.PreDrywall.Verified += value.PreDrywall.Verified;
        });

        jobProgress.PreDrywall.MustCorrect = 0;
        _.forEach(jobChecklistResponseProgress, function sumFinalVerified (value) {
            jobProgress.PreDrywall.MustCorrect += value.PreDrywall.MustCorrect;
        });

        jobProgress.Final.Verified = 0;
        _.forEach(jobChecklistResponseProgress, function sumMustCorrectVerified (value) {
            jobProgress.Final.Verified += value.Final.Verified;
        });

        jobProgress.Final.MustCorrect = 0;
        _.forEach(jobChecklistResponseProgress, function sumFinalVerified (value) {
            jobProgress.Final.MustCorrect += value.Final.MustCorrect;
        });
    }
}

export default JobChecklistController;
