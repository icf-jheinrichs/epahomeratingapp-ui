import _findIndex from 'lodash/findIndex';

class JobsChecklistPageController {
    constructor (
        $rootScope,
        $stateParams,
        AuthorizationService,
        DialogService,
        JobChecklistStateService,
        JobsService,
        JobDataResponseService,
        ModalService,
        UserCompanyService,
        UI_ENUMS,
        jobTitleFilter
    ) {
        'ngInject';

        this.$rootScope               = $rootScope;
        this.$stateParams             = $stateParams;

        this.AuthorizationService     = AuthorizationService;
        this.DialogService            = DialogService;
        this.JobChecklistStateService = JobChecklistStateService;
        this.JobsService              = JobsService;
        this.JobDataResponseService   = JobDataResponseService;
        this.ModalService             = ModalService;
        this.UserCompanyService       = UserCompanyService;
        this.MESSAGING                = UI_ENUMS.MESSAGING;
        this.JOB_STATUS               = UI_ENUMS.JOB_STATUS;
        this.CATEGORY_PROGRESS        = UI_ENUMS.CATEGORY_PROGRESS;
        this.RESPONSES                = UI_ENUMS.RESPONSES;
        this.USER_TYPE                = UI_ENUMS.USER_TYPE;
        this.DIALOG                   = UI_ENUMS.DIALOG;
        this.MODAL                    = UI_ENUMS.MODAL;

        this.jobTitleFilter           = jobTitleFilter;


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

        this.jobCompleteStatus = {
            MustCorrect     : 0,
            BuilderVerified : 0,
            Remaining       : 0
        };

        this.role              = this.$stateParams.role;
        this.userAuthorization = this.AuthorizationService.getUserRole();

        this
            .JobChecklistStateService
            .setJobDisplayListState()
            .then(()=> {
                this.jobCompleteStatus = this.JobChecklistStateService.getJobCompleteStatus();
            });

        this
            .UserCompanyService
            .getCompany(this.AuthorizationService.getCurrentOrganizationId())
            .then((company) => {
                this.company = company;
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

    submitToProvider () {
        if (this.canSubmitJob()) {
            this
                .DialogService
                .openDialog(this.DIALOG.SUBMIT_TO_PROVIDER)
                .then((confirmation) => {
                    if (confirmation) {
                        this.job.Status          = this.JOB_STATUS.SUBMITTED_TO_PROVIDER;
                        this.job.InternalReview  = false;
                        this.job.ProviderCompany = this.selectedProviderToAdd.ProviderRESNETId;

                        this
                            .JobChecklistStateService
                            .submitJob(this.selectedProviderToAdd.ProviderRESNETId);
                    }
                });
        }
    }

    completeJob () {
        if (this.canCompleteJob()) {
            this.jobIsActive = false;
            this.job.Status = this.JOB_STATUS.COMPLETED;

            this
                .JobChecklistStateService
                .completeJob();
        } else {
            this.showCompleteModal = true;
        }
    }

    flagJobForReview () {
        if (this.canFlagForReview) {
            this.job.InternalReview = true;

            this
                .JobChecklistStateService
                .flagJobForReview();
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

    canSubmitJob () {
        return this.job.Status === this.JOB_STATUS.COMPLETED;
    }

    canCompleteJob () {
        return this.job.Status === this.JOB_STATUS.ACTIVE && this.jobCompleteStatus.Remaining === 0 && this.jobCompleteStatus.MustCorrect === 0 && this.jobCompleteStatus.BuilderVerified <= 8;
    }

    get canFlagForReview () {
        return this.userAuthorization.Admin && !this.job.InternalReview && this.job.Status === this.JOB_STATUS.COMPLETED;
    }
}

export default JobsChecklistPageController;
