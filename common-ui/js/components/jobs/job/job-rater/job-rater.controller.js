import Job from '../job.class.js';
import _defer from 'lodash/defer';

class JobRaterController extends Job {
    $onInit () {
        super.$onInit();

        this.OFFLINE_CONFIRMATION_DIALOG = this.UI_ENUMS.DIALOG.MAKE_JOB_OFFLINE;
        if (!this.syncService.online) {
            this.OFFLINE_DISABLED_DIALOG = this.UI_ENUMS.DIALOG.UNDO_JOB_OFFLINE;
        }

        let self = this;

        this.assetUpToDate = true;
        this.docUpToDate   = true;

        this.toggleStatusClass = this.syncService.getJobStatus(this.job._id);

        function selfApply () {
            _defer(function afterDigest () {
                self.$scope.$apply();
            });
        }

        this.assetDownloadedListener = this.$rootScope.$on(this.MESSAGING.ASSET_DOWNLOADED, (event, status) => {
          console.warn('assetDownloadedListener POOP', status);

            this.$log.log(`[job.controller.js] assetDownloadedListener ${status.jobID} ${status.assetStatus.total} ${status.assetStatus.missing}`);
            if (this.job.offlineAvailable && status.jobID === this.job._id && status.assetStatus.missing > 0) {
                this.toggleStatusClass = this.SYNC_STATUS.DOWN;
            } else if (this.job.offlineAvailable && status.jobID === this.job._id && status.assetStatus.missing === 0) {
                this.toggleStatusClass = '';
            }

            selfApply();
        });

        this.assetBeingUploadedForJobListener = this.$rootScope.$on(this.MESSAGING.ASSET_BEING_UPLOADED_FOR_JOB, (event, status) => {
          console.warn('assetBeingUploadedForJobListener POOP', status);

            this.$log.log(`[job.controller.js] assetBeingUploadedForJobListener ${status.jobID}`);

            if (this.job.offlineAvailable && status.jobID === this.job._id) {
                this.toggleStatusClass = this.SYNC_STATUS.UP;
                this.assetUpToDate     = false;
            }

            selfApply();
        });

        this.assetUploadedForJobListener = this.$rootScope.$on(this.MESSAGING.ASSET_UPLOADED_FOR_JOB, (event, status) => {
          console.warn('assetUploadedForJobListener POOP', status);
            this.$log.log(`[job.controller.js] assetUploadedForJobListener ${status.jobID}`);

            this.assetUpToDate = true;

            if (this.job.offlineAvailable && status.jobID === this.job._id && this.docUpToDate) {
                this.toggleStatusClass = '';
            }

            selfApply();
        });

        this.deviceOfflineListener = this.$rootScope.$on(this.MESSAGING.DEVICE_OFFLINE, (event) => {
            this.$log.log(`[job.controller.js] deviceOfflineListener ${this.toggleStatusClass}`);

            this.OFFLINE_DISABLED_DIALOG = this.UI_ENUMS.DIALOG.UNDO_JOB_OFFLINE;

            if (this.job.offlineAvailable && this.toggleStatusClass !== '') {
                this.toggleStatusClass = this.SYNC_STATUS.ERROR;
            } else if (this.job.offlineAvailable && this.toggleStatusClass === '') {
                this.toggleStatusClass = this.SYNC_STATUS.OFFLINE;
            }

            selfApply();
        });

        this.deviceOnlineListener = this.$rootScope.$on(this.MESSAGING.DEVICE_ONLINE, (event, jobs) => {
            this.$log.log(`[job.controller.js] deviceOnlineListener ${jobs.uploadingJobs}`);

            this.OFFLINE_DISABLED_DIALOG = undefined;

            if (this.job.offlineAvailable && this.toggleStatusClass === this.SYNC_STATUS.ERROR) {
                if (jobs.uploadingJobs.indexOf(this.job._id) >= 0) {
                    this.toggleStatusClass = this.SYNC_STATUS.UP;
                } else {
                    this.toggleStatusClass = this.SYNC_STATUS.DOWN;
                }
            } else if (this.job.offlineAvailable && this.toggleStatusClass === this.SYNC_STATUS.OFFLINE) {
                this.toggleStatusClass = '';
            }

            selfApply();
        });

        this.dbStartSyncListener = this.$rootScope.$on(this.MESSAGING.DB_START_SYNC, (event) => {
            this.$log.log('[job.controller.js] dbStartSyncListener');

            this.docUpToDate = false;
        });

        this.dbPauseSyncListener = this.$rootScope.$on(this.MESSAGING.DB_PAUSE_SYNC, (event) => {
            this.$log.log('[job.controller.js] dbPauseSyncListener');

            this.docUpToDate = true;

            if (this.assetUpToDate) {
                this.toggleStatusClass = '';
            }

            selfApply();
        });
    }

    openJob () {
        this
            .onOpenJob({jobId : this.job._id});
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
