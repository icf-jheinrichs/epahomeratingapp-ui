import _findIndex from 'lodash/findIndex';
import _find from 'lodash/find';

class JobsChecklistPageController {
    constructor (
        $rootScope,
        $scope,
        $stateParams,
        $log,
        $window,
        AnalyticsService,
        AuthorizationService,
        DialogService,
        DropdownService,
        JobChecklistStateService,
        JobsService,
        JobDataResponseService,
        ModalService,
        UserCompanyService,
        ScrollService,
        UI_ENUMS,
        jobTitleFilter
    ) {
        'ngInject';

        this.$rootScope               = $rootScope;
        this.$scope                   = $scope;
        this.$stateParams             = $stateParams;
        this.$window                  = $window;
        this.$log                     = $log;

        this.AnalyticsService         = AnalyticsService;
        this.AuthorizationService     = AuthorizationService;
        this.DialogService            = DialogService;
        this.DropdownService          = DropdownService;
        this.JobChecklistStateService = JobChecklistStateService;
        this.JobsService              = JobsService;
        this.JobDataResponseService   = JobDataResponseService;
        this.ModalService             = ModalService;
        this.ScrollService            = ScrollService;
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
        this.houseId = this.$stateParams.houseId;

        this.jobIsActive = (this.job.Status === this.JOB_STATUS.ACTIVE);

        //TODO: this belongs in a directive
        this.showActionsDropDown       = false;
        this.showCompleteModal         = false;
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
            .setJobDisplayListState(this.$stateParams.ratingCompanyID)
            .then(()=> {
                this.jobCompleteStatus = this.JobChecklistStateService.getJobCompleteStatus();
            });

        this
            .UserCompanyService
            .getCompany(this.AuthorizationService.getCurrentOrganizationId())
            .then((company) => {
                this.company = company;

                return this
                    .UserCompanyService
                    .getProviderCompanies();
            })
            .then((providerCompanies) => {
                this.relatedProviderCompanys = this.company.RelatedProviderCompanys.map((O_ID) => {
                    return _find(providerCompanies, {O_ID});
                });

                if (this.company.RelatedProviderCompanys.length > 0) {
                    this.hasRelatedProviderCompanies = true;
                    this
                        .selectedProviderToAdd = this.relatedProviderCompanys[0];
                } else {
                    this.hasRelatedProviderCompanies = false;
                }
            });

        this
            .ScrollService
            .setScrollContext('JOB_CHECKLIST');

        this
            .$rootScope
            .$broadcast(this.MESSAGING.SET_TOP_PAD, 0);
    }

    $onDestroy () {
        // unregister listeners
        this.responseListener();
        this.itemDataListener();
        this.postCommentListener();
        this.housePhotoListener();
        this.viewHvacDesignReportListener();

        this
            .ScrollService
            .setScrollContext('DEFAULT');

        this
            .$rootScope
            .$broadcast(this.MESSAGING.SET_TOP_PAD, 45);
    }

    appendFilterParams () {
        let sessionStoredParams = this.$window.sessionStorage.getItem('filter.param');
        return sessionStoredParams === undefined ? {} : JSON.parse(sessionStoredParams);
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

        this.jobCompleteStatus = this.JobChecklistStateService.getJobCompleteStatus();
        this.$rootScope.$emit(this.MESSAGING.UPDATE_CHECKLIST_RESPONSE_TOTALS);
    }

    updateChecklistItemData (update) {
        this
            .JobChecklistStateService
            .updateChecklistItemData(update);

        this.jobCompleteStatus = this.JobChecklistStateService.getJobCompleteStatus();
        this.$rootScope.$emit(this.MESSAGING.UPDATE_CHECKLIST_RESPONSE_TOTALS);
    }

    postComment (comment) {
        this
            .JobChecklistStateService
            .postComment(comment);
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
                        this.job.ProviderCompany = this.selectedProviderToAdd.O_ID;

                        this
                            .JobChecklistStateService
                            .submitJob(this.selectedProviderToAdd);
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

            this
                .AnalyticsService
                .trackEvent({
                    Category : 'job',
                    Action   : 'complete',
                    Label    : '',
                    Value    : ''
                });
        } else {
            this.ModalService.openModal(this.MODAL.COMPLETE_JOB);
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
        let downloadTask = {
            jobID           : this.job._id,
            ratingCompanyID : this.$stateParams.ratingCompanyID
        };

        this.JobsService
            .getExportSignedUrl(downloadTask)
            .then((response) => {
                if (response) {
                    this.downloadUrl = response;

                    this.ModalService
                        .openModal(this.MODAL.DOWNLOAD_REM_XML);
                } else {
                    this.DialogService
                        .openDialog(this.DIALOG.DOWNLOAD_ERROR);
                }
            });
    }

    showHistory () {
        this
            .DropdownService
            .closeDropdown('dropdown-job-info');

        this
            .ModalService
            .openModal(this.MODAL.SHOW_HISTORY);
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

    markAsRegistered () {
        if (this.userAuthorization.Provider) {
            this.job.Status = this.JOB_STATUS.REGISTERED;

            this
                .JobChecklistStateService
                .markAsRegistered();
        }
    }

    canMarkAsRegistered () {
        return this.job.Status === this.JOB_STATUS.SUBMITTED_TO_PROVIDER;
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
