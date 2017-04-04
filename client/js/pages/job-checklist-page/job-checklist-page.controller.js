import _findIndex from 'lodash/findIndex';
import _forEach from 'lodash/forEach';

class JobsChecklistPageController {
    constructor ($rootScope, $stateParams, JobsService, JobDataResponseService, UI_ENUMS, jobTitleFilter) {
        'ngInject';

        this.$rootScope             = $rootScope;
        this.$stateParams           = $stateParams;

        this.JobsService            = JobsService;
        this.JobDataResponseService = JobDataResponseService;
        this.MESSAGING              = UI_ENUMS.MESSAGING;
        this.JOB_STATUS             = UI_ENUMS.JOB_STATUS;
        this.CATEGORY_PROGRESS      = UI_ENUMS.CATEGORY_PROGRESS;
        this.RESPONSES              = UI_ENUMS.RESPONSES;

        this.jobTitleFilter         = jobTitleFilter;

        this.responseListener = this.$rootScope.$on(this.MESSAGING.UPDATE_CHECKLIST_RESPONSE, (event, response) => {
            this.updateChecklistResponse(response);
        });

        this.itemDataListener = this.$rootScope.$on(this.MESSAGING.UPDATE_CHECKLIST_ITEM_DATA, (event, update) => {
            this.updateChecklistItemData(update);
        });

        this.postCommentListener = this.$rootScope.$on(this.MESSAGING.POST_COMMENT, (event, comment) => {
            this.postComment(comment);
        });

        this.housePhotoListener = this.$rootScope.$on(this.MESSAGING.UPDATE_HOUSE_PHOTO, (event, photoData) => {
            this.updateHousePhoto(photoData);
        });

        this.viewHvacDesignReportListener = this.$rootScope.$on(this.MESSAGING.VIEW_HVAC_DESIGN_REPORT, (event) => {
            this.viewHvacDesignReport();
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
        this.showActionsDropDown       = false;
        this.showCompleteModal         = false;
        this.showDownloadModal         = false;
        this.showHvacDesignReportModal = false;

        this.checklistItemsQuantity = this.job.Progress.PreDrywall.Total + this.job.Progress.Final.Total;
        this.setProgressStatus();
    }

    $onDestroy () {
        // unregister listeners
        this.responseListener();
        this.itemDataListener();
        this.postCommentListener();
        this.housePhotoListener();
        this.viewHvacDesignReportListener();
    }

    putJobData () {
        this
            .JobsService
            .put(this.job);
    }

    putJobDataResponse () {
        this
            .JobDataResponseService
            .put(this.jobDataResponse);
    }

    getRatingTypeClass () {
        //TODO: make this better
        return (this.job.RatingType === 'energy-star') ? 'label-energy-star' : 'label-hers-rating';
    }

    updateHousePhoto (photoData) {
        let secondaryIndex;

        if (this.job.Primary.HouseId === photoData.HouseId) {
            this.job.Primary.Photo = [photoData.photo];
        } else {
            secondaryIndex = _findIndex(this.job.Secondary, {HouseId : photoData.HouseId});

            this.job.Secondary[secondaryIndex].Photo = [photoData.photo];
        }

        this.putJobData();
    }

    updateChecklistResponse (response) {
        let updateResponse = (response.Response.length === 0) ? undefined : response.Response;

        this.updateChecklistResponseTotals(response);
        this.updateJobResponseTotals();
        this.setProgressStatus();

        this.jobDataResponse.ChecklistItems[response.Category][response.CategoryProgress][response.ItemId].Response = updateResponse;

        this.putJobDataResponse();

        this.putJobData();
    }

    updateChecklistItemData (update) {
        this.jobDataResponse.ChecklistItems[update.Category][update.CategoryProgress][update.ItemId].ItemData = update.ItemData;

        this.putJobDataResponse();
    }

    postComment (comment) {
        this.jobDataResponse.ChecklistItems[comment.Category][comment.CategoryProgress][comment.ItemId].Comments.push(comment.Comment);

        this.putJobDataResponse();
    }

    //TODO: all dropdown stuff belongs in a directive
    toggleDropDown () {
        this.showActionsDropDown = !this.showActionsDropDown;
    }

    //TODO: all dropdown stuff belongs in a directive
    hideDropDown () {
        this.showActionsDropDown = false;
    }

    //TODO: all modal stuff belongs in a directive
    toggleModal () {
        this.showCompleteModal = !this.showCompleteModal;
    }

    //TODO: all modal stuff belongs in a directive
    hideModal () {
        this.showCompleteModal = false;
    }

    //TODO: all modal stuff belongs in a directive
    toggleModalDownload () {
        this.showDownloadModal = !this.showDownloadModal;
    }

    //TODO: all modal stuff belongs in a directive
    hideModalDownload () {
        this.showDownloadModal = false;
    }

    //TODO: all modal stuff belongs in a directive
    toggleModalHvacDesignReport () {
        this.showHvacDesignReportModal = !this.showHvacDesignReportModal;
    }

    //TODO: all modal stuff belongs in a directive
    hideModalHvacDesignReport () {
        this.showHvacDesignReportModal = false;
    }

    completeJob () {
        if (this.totalRemaining === 0 && this.mustCorrectItems === 0) {
            this.job.Status = this.JOB_STATUS.INTERNAL_REVIEW;
            this.jobIsActive = false;

            this.putJobData();
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

        if (jobProgress.PreDrywall.Verified + jobProgress.PreDrywall.MustCorrect < jobProgress.PreDrywall.Total) {
            this.job.ProgressLevel = this.CATEGORY_PROGRESS['pre-drywall'].Key;
        } else {
            this.job.ProgressLevel = this.CATEGORY_PROGRESS['final'].Key;
        }
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

        this.$rootScope.$broadcast(this.MESSAGING.UPDATE_CHECKLIST_RESPONSE_TOTALS, this.jobDataResponse.Progress);
    }

    onDownloadRequest () {
        this.hideDropDown();

        this.JobsService
            .getExportSignedUrl(this.job._id)
            .then((response) => {
                this.downloadUrl = response;
                this.toggleModalDownload();
            });
    }

    updateJobResponseTotals (response) {
        let jobProgress = this.job.Progress;
        let jobChecklistResponseProgress = this.jobDataResponse.Progress;

        jobProgress.PreDrywall.Verified = 0;
        _forEach(jobChecklistResponseProgress, function sumPreDrywallVerified (value) {
            jobProgress.PreDrywall.Verified += value.PreDrywall.Verified;
        });

        jobProgress.PreDrywall.MustCorrect = 0;
        _forEach(jobChecklistResponseProgress, function sumFinalVerified (value) {
            jobProgress.PreDrywall.MustCorrect += value.PreDrywall.MustCorrect;
        });

        jobProgress.Final.Verified = 0;
        _forEach(jobChecklistResponseProgress, function sumMustCorrectVerified (value) {
            jobProgress.Final.Verified += value.Final.Verified;
        });

        jobProgress.Final.MustCorrect = 0;
        _forEach(jobChecklistResponseProgress, function sumFinalVerified (value) {
            jobProgress.Final.MustCorrect += value.Final.MustCorrect;
        });
    }

    viewHvacDesignReport () {
        let secondaryIndex;
        let houseId           = parseInt(this.$stateParams.houseId, 10);
        this.hvacDesignReport = '';

        if (this.job.Primary.HouseId === houseId) {
            this.hvacDesignReport = (this.job.Primary.HvacDesignReport.length) ? this.job.Primary.HvacDesignReport[0].Name : '';
        } else if (this.job.Secondary.length > 0) {
            secondaryIndex = _findIndex(this.job.Secondary, {HouseId : houseId});

            this.hvacDesignReport = (this.job.Secondary[secondaryIndex].HvacDesignReport.length) ? this.job.Secondary[secondaryIndex].HvacDesignReport[0].Name : '';
        }

        this.showHvacDesignReportModal = true;
    }

    //TODO: determine if we need user friendly ID in addition to DB id.
    get id () {
        return this.job._id.substring(0, 8).toUpperCase();
    }

    get JobTitle () {
        return this.jobTitleFilter(this.job.Primary.AddressInformation);
    }
}

export default JobsChecklistPageController;
