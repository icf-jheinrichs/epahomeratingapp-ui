import _findIndex from 'lodash/findIndex';

class JobsChecklistPageController {
    constructor ($rootScope, $stateParams, AuthenticationService, JobChecklistStateService, JobsService, JobDataResponseService, UI_ENUMS, jobTitleFilter, ModalService) {
        'ngInject';

        this.$rootScope               = $rootScope;
        this.$stateParams             = $stateParams;

        this.JobChecklistStateService = JobChecklistStateService;
        this.JobsService              = JobsService;
        this.JobDataResponseService   = JobDataResponseService;
        this.ModalService             = ModalService;
        this.MESSAGING                = UI_ENUMS.MESSAGING;
        this.JOB_STATUS               = UI_ENUMS.JOB_STATUS;
        this.CATEGORY_PROGRESS        = UI_ENUMS.CATEGORY_PROGRESS;
        this.RESPONSES                = UI_ENUMS.RESPONSES;
        this.USER_TYPE                = UI_ENUMS.USER_TYPE;
        this.MODAL                    = UI_ENUMS.MODAL;

        this.jobTitleFilter           = jobTitleFilter;

        this.AuthenticationService    = AuthenticationService;

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
        this.user = this.AuthenticationService.getUser();
        if (this.user.userType === this.USER_TYPE.ADMIN) {
            this.showEditJobOption = true;
        } else {
            this.showEditJobOption = false;
        }

        this.jobCompleteStatus = {
            MustCorrect     : 0,
            BuilderVerified : 0,
            Remaining       : 0
        };

        this.role = this.$stateParams.role;

        this
            .JobChecklistStateService
            .setJobDisplayListState()
            .then(()=> {
                this.jobCompleteStatus = this.JobChecklistStateService.getJobCompleteStatus();
            });
    }

    $onDestroy () {
        // unregister listeners
        this.responseListener();
        this.itemDataListener();
        this.postCommentListener();
        this.housePhotoListener();
        this.viewHvacDesignReportListener();
    }

    getRatingTypeClass () {
        //TODO: make this better
        return (this.job.RatingType === 'energy-star') ? 'label-energy-star' : 'label-hers-rating';
    }

    updateHousePhoto (photoData) {
        this
            .JobChecklistStateService
            .updateHousePhoto(photoData);
    }

    updateChecklistResponse (response) {
        this
            .JobChecklistStateService
            .updateChecklistResponse(response);

        this.$rootScope.$emit(this.MESSAGING.UPDATE_CHECKLIST_RESPONSE_TOTALS);
    }

    updateChecklistItemData (update) {
        this
            .JobChecklistStateService
            .updateChecklistItemData(update);

        this.$rootScope.$emit(this.MESSAGING.UPDATE_CHECKLIST_RESPONSE_TOTALS);
    }

    postComment (comment) {
        this
            .JobChecklistStateService
            .postComment(comment);
    }

    //TODO: all dropdown stuff belongs in a directive
    toggleDropDown () {
        this.jobCompleteStatus = this.JobChecklistStateService.getJobCompleteStatus();
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
        if (this.canCompleteJob()) {
            this.jobIsActive = false;
            this.job.Status = this.JOB_STATUS.INTERNAL_REVIEW;

            this
                .JobChecklistStateService
                .completeJob();
        } else {
            this.showCompleteModal = true;
        }
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

    showHistory () {
        this.hideDropDown();
        this.ModalService.openModal(this.MODAL.SHOW_HISTORY);
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

    canCompleteJob () {
        return this.jobCompleteStatus.Remaining === 0 && this.jobCompleteStatus.MustCorrect === 0 && this.jobCompleteStatus.BuilderVerified <= 8;
    }
}

export default JobsChecklistPageController;
