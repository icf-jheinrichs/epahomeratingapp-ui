import moment from 'moment';

class JobController {
    constructor ($log, $rootScope, jobTitleFilter, CONTEXT, UI_ENUMS, BASE_IMAGE_URL) {
        'ngInject';

        this.$log              = $log;
        this.$rootScope        = $rootScope;

        this.jobTitleFilter    = jobTitleFilter;
        this.DEFAULT_PHOTO     = UI_ENUMS.IMAGES.DEFAULT_PHOTO;
        this.BASE_IMAGE_URL    = BASE_IMAGE_URL;

        this.contextIsApp      = CONTEXT = UI_ENUMS.CONTEXT.APP;
        this.DIALOG            = UI_ENUMS.DIALOG.MAKE_JOB_OFFLINE;
        this.MESSAGING         = UI_ENUMS.MESSAGING;

        this.SYNC_STATUS       = {
            'UP'    : 'sync-up',
            'DOWN'  : 'sync-down',
            'ERROR' : 'sync-error'
        };
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
        this.toggleStatusClass = '';

        //
        this.assetDownloadedListener = this.$rootScope.$on(this.MESSAGING.ASSET_DOWNLOADED, (event, status) => {
            this.$log.log(`[job.controller.js] assetDownloadedListener ${status.jobID} ${status.assetStatus.total} ${status.assetStatus.missing}`);
            if (this.job.offlineAvailable && status.jobID === this.job._id && status.assetStatus.missing > 0) {
                this.toggleStatusClass = this.SYNC_STATUS.DOWN;
            } else {
                this.toggleStatusClass = '';
            }
        });

        this.assetBeingUploadedForJobListener = this.$rootScope.$on(this.MESSAGING.ASSET_BEING_UPLOADED_FOR_JOB, (event, status) => {
            this.$log.log(`[job.controller.js] assetBeingUploadedForJobListener ${status.jobID}`);

            if (this.job.offlineAvailable && status.jobID === this.job._id) {
                this.toggleStatusClass = this.SYNC_STATUS.UP;
            }
        });

        this.assetUploadedForJobListener = this.$rootScope.$on(this.MESSAGING.ASSET_UPLOADED_FOR_JOB, (event, status) => {
            this.$log.log(`[job.controller.js] assetUploadedForJobListener ${status.jobID}`);

            if (this.job.offlineAvailable && status.jobID === this.job._id) {
                this.toggleStatusClass = '';
            }
        });

        this.deviceOfflineListener = this.$rootScope.$on(this.MESSAGING.DEVICE_OFFLINE, (event) => {
            this.$log.log('[job.controller.js] deviceOfflineListener');

            if (this.job.offlineAvailable && this.toggleStatusClass !== '') {
                this.toggleStatusClass = this.SYNC_STATUS.ERROR;
            }
        });

        this.deviceOnlineListener = this.$rootScope.$on(this.MESSAGING.DEVICE_ONLINE, (event, jobs) => {
            this.$log.log(`[job.controller.js] deviceOnlineListener ${jobs.uploadingJobs}`);

            if (this.job.offlineAvailable && this.toggleStatusClass === this.SYNC_STATUS.ERROR) {
                if (jobs.uploadingJobs.indexOf(this.job._id) >= 0) {
                    this.toggleStatusClass = this.SYNC_STATUS.UP;
                } else {
                    this.toggleStatusClass = this.SYNC_STATUS.DOWN;
                }
            }
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
