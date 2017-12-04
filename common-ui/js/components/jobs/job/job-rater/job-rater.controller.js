import Job from '../job.class.js';
import _defer from 'lodash/defer';

class JobRaterController extends Job {
    $onInit () {
        super.$onInit();

        this.toggleStatusClass = this.job.offlineAvailable ? this.syncService.getJobStatus(this.job._id) : '';

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
}

export default JobRaterController;
