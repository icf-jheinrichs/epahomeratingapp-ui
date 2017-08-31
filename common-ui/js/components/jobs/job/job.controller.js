import moment from 'moment';
import _defer from 'lodash/defer';

class JobController {
    constructor ($log, $rootScope, $scope, jobTitleFilter, CONTEXT, UI_ENUMS, BASE_IMAGE_URL, SyncService) {
        'ngInject';

        this.$log              = $log;
        this.$rootScope        = $rootScope;
        this.$scope            = $scope;

        this.jobTitleFilter    = jobTitleFilter;
        this.DEFAULT_PHOTO     = UI_ENUMS.IMAGES.DEFAULT_PHOTO;
        this.BASE_IMAGE_URL    = BASE_IMAGE_URL;

        this.CONTEXT_IS_APP    = CONTEXT === UI_ENUMS.CONTEXT.APP;
        this.DIALOG            = UI_ENUMS.DIALOG.MAKE_JOB_OFFLINE;
        this.MESSAGING         = UI_ENUMS.MESSAGING;

        this.syncService       = SyncService;

        this.SYNC_STATUS       = UI_ENUMS.SYNC_STATUS;
    }

    $onInit () {
        if (this.job.RatingType === 'energy-star') {
            this.RatingType      = 'ENERGY STAR';
            this.RatingTypeClass = 'label-energy-star';
        } else {
            this.RatingType      = 'HERS Rating';
            this.RatingTypeClass = 'label-hers-rating';
        }

        this.sampleQuantity    = this.job.Secondary.length + 1;
        this.isSample          = this.sampleQuantity > 1;

        this.toggleStatusClass = this.job.offlineAvailable ? this.syncService.getJobStatus(this.job._id) : '';

        //
        this.assetDownloadedListener = this.$rootScope.$on(this.MESSAGING.ASSET_DOWNLOADED, (event, status) => {
            this.$log.log(`[job.controller.js] assetDownloadedListener ${status.jobID} ${status.assetStatus.total} ${status.assetStatus.missing}`);
            if (this.job.offlineAvailable && status.jobID === this.job._id && status.assetStatus.missing > 0) {
                this.toggleStatusClass = this.SYNC_STATUS.DOWN;
            } else if (this.job.offlineAvailable && status.jobID === this.job._id && status.assetStatus.missing === 0) {
                this.toggleStatusClass = '';
            }

            let self = this;
            _defer(function afterDigest () {
                self.$scope.$apply();
            });
        });

        this.assetBeingUploadedForJobListener = this.$rootScope.$on(this.MESSAGING.ASSET_BEING_UPLOADED_FOR_JOB, (event, status) => {
            this.$log.log(`[job.controller.js] assetBeingUploadedForJobListener ${status.jobID}`);

            if (this.job.offlineAvailable && status.jobID === this.job._id) {
                this.toggleStatusClass = this.SYNC_STATUS.UP;
            }

            let self = this;
            _defer(function afterDigest () {
                self.$scope.$apply();
            });
        });

        this.assetUploadedForJobListener = this.$rootScope.$on(this.MESSAGING.ASSET_UPLOADED_FOR_JOB, (event, status) => {
            this.$log.log(`[job.controller.js] assetUploadedForJobListener ${status.jobID}`);

            if (this.job.offlineAvailable && status.jobID === this.job._id) {
                this.toggleStatusClass = '';
            }

            let self = this;
            _defer(function afterDigest () {
                self.$scope.$apply();
            });
        });

        this.deviceOfflineListener = this.$rootScope.$on(this.MESSAGING.DEVICE_OFFLINE, (event) => {
            this.$log.log(`[job.controller.js] deviceOfflineListener ${this.toggleStatusClass}`);

            if (this.job.offlineAvailable && this.toggleStatusClass !== '') {
                this.toggleStatusClass = this.SYNC_STATUS.ERROR;
            } else if (this.job.offlineAvailable && this.toggleStatusClass === '') {
                this.toggleStatusClass = this.SYNC_STATUS.OFFLINE;
            }

            let self = this;
            _defer(function afterDigest () {
                self.$scope.$apply();
            });
        });

        this.deviceOnlineListener = this.$rootScope.$on(this.MESSAGING.DEVICE_ONLINE, (event, jobs) => {
            this.$log.log(`[job.controller.js] deviceOnlineListener ${jobs.uploadingJobs}`);

            if (this.job.offlineAvailable && this.toggleStatusClass === this.SYNC_STATUS.ERROR) {
                if (jobs.uploadingJobs.indexOf(this.job._id) >= 0) {
                    this.toggleStatusClass = this.SYNC_STATUS.UP;
                } else {
                    this.toggleStatusClass = this.SYNC_STATUS.DOWN;
                }
            } else if (this.job.offlineAvailable && this.toggleStatusClass === this.SYNC_STATUS.OFFLINE) {
                this.toggleStatusClass = '';
            }

            let self = this;
            _defer(function afterDigest () {
                self.$scope.$apply();
            });
        });
    }

    /**
     * deregester all $rootScope listeners
     */
    $onDestroy () {
        this.assetDownloadedListener();
        this.assetBeingUploadedForJobListener();
        this.assetUploadedForJobListener();
        this.deviceOfflineListener();
        this.deviceOnlineListener();
    }

    handleAvailableOfflineChange (isOn) {
        this.job.offlineAvailable = isOn;

        this.toggleStatusClass = '';

        this.$rootScope
            .$emit(this.MESSAGING.JOB_AVAILABLE_OFFLINE, {
                offlineAvailable : this.job.offlineAvailable,
                job              : this.job._id
            });
    }

    hasStatusLabel () {
        return (this.job.ReturnedFromInternal || this.job.ReturnedFromProvider);
    }

    get JobTitle () {
        return this.jobTitleFilter(this.job.Primary.AddressInformation);
    }

    get lastUpdateTime () {
        return moment(this.job.History[this.job.History.length - 1].DateTime).format('h:mm:ss a, MMM Do YYYY');
    }

    get lastUpdateType () {
        return this.job.History[this.job.History.length - 1].Description;
    }
}

export default JobController;
