import moment from 'moment';
import _defer from 'lodash/defer';


class JobSyncStatusController {
    constructor ($log, $rootScope, $scope, UI_ENUMS, SyncService) {
        'ngInject';

        this.STATUS = UI_ENUMS.STATUS;
        this.STATUS_CLASSNAME = UI_ENUMS.STATUS_CLASSNAME;

        this.$log        = $log;
        this.$rootScope  = $rootScope;
        this.$scope      = $scope;
        this.syncService = SyncService;

        this.MESSAGING  = UI_ENUMS.MESSAGING;
    }

    $onInit () {
        let status = this.syncService.getOverallStatus();
        let self   = this;

        this.syncStatus      = status.syncStatus;
        this.syncStatusClass = status.syncStatusClass;

        this.dbRefreshed();
        if (this.syncStatus === this.STATUS.LAST_UPDATED) {
            let now         = moment(new Date()).format('MMM Do YYYY, h:mm:ss a');
            this.syncStatus = this.STATUS.LAST_UPDATED.replace(':now:', now);
        } else if (this.syncStatus === this.STATUS.SYNCING) {
            this.dbRefreshing();
        }

        function applyChange () {
            _defer(function afterDigest () {
                self.$scope.$apply();
            });
        }

        // TODO: May need to re-write the listeners...
        this.dbStartSyncListener = this.$rootScope.$on(this.MESSAGING.DB_START_SYNC, (event) => {
            this.$log.log('[job-sync-status.controller.js] dbStartSyncListener');

            this.syncStatus      = this.STATUS.SYNCING;
            this.syncStatusClass = this.STATUS_CLASSNAME.SYNCING;

            // disable the refresh button
            this.dbRefreshing();

            applyChange();
        });

        this.dbPauseSyncListener = this.$rootScope.$on(this.MESSAGING.DB_PAUSE_SYNC, (event) => {
            this.$log.log('[job-sync-status.controller.js] dbPauseSyncListener');

            // need to check image status
            if (this.syncService.checkAllImageFinishedSyncing() === true) {
                this.syncStatus      = this.STATUS.UP_TO_DATE;
                this.syncStatusClass = this.STATUS_CLASSNAME.ONLINE_UP_TO_DATE;

                this.dbRefreshed();
            }

            applyChange();
        });

        this.dbErrorSyncListener = this.$rootScope.$on(this.MESSAGING.DB_ERROR_SYNC, (event) => {
            this.$log.log('[job-sync-status.controller.js] dbErrorSyncListener');

            if (this.syncStatusClass !== this.STATUS_CLASSNAME.OFFLINE) {
                this.syncStatus      = this.STATUS.SYNC_INCOMPLETE;
                this.syncStatusClass = this.STATUS_CLASSNAME.SYNC_INCOMPLETE;
            }

            // enable the refresh button
            this.dbRefreshed();

            applyChange();
        });

        this.deviceOfflineListener = this.$rootScope.$on(this.MESSAGING.DEVICE_OFFLINE, (event) => {
            this.$log.log('[job-sync-status.controller.js] deviceOfflineListener');

            if (this.syncStatusClass === this.STATUS_CLASSNAME.ONLINE_UP_TO_DATE || this.syncStatusClass === this.STATUS_CLASSNAME.SYNC_INCOMPLETE) {
                let now = moment(new Date()).format('MMM Do YYYY, h:mm:ss a');

                this.syncStatus      = this.STATUS.LAST_UPDATED.replace(':now:', now);
                this.syncStatusClass = this.STATUS_CLASSNAME.OFFLINE;
            } else if (this.syncStatusClass === this.STATUS_CLASSNAME.SYNCING || this.syncStatusClass === this.STATUS_CLASSNAME.LOCAL_UNSYNCED) {
                this.syncStatus      = this.STATUS.SYNC_INCOMPLETE;
                this.syncStatusClass = this.STATUS_CLASSNAME.SYNC_INCOMPLETE;
            }

            applyChange();
        });

        this.deviceOnlineListener = this.$rootScope.$on(this.MESSAGING.DEVICE_ONLINE, (event, jobs) => {
            this.$log.log(`[job-sync-status.controller.js] deviceOnlineListener ${jobs.uploadingJobs}`);

            if (this.syncStatusClass === this.STATUS_CLASSNAME.OFFLINE) {
                this.syncStatus      = this.STATUS.UP_TO_DATE;
                this.syncStatusClass = this.STATUS_CLASSNAME.ONLINE_UP_TO_DATE;
            } else if (jobs.uploadingJobs.length > 0) {
                let now = moment(new Date()).format('MMM Do YYYY, h:mm:ss a');

                this.syncStatus      = this.STATUS.LAST_UPDATED.replace(':now:', now);
                this.syncStatusClass = this.STATUS_CLASSNAME.LOCAL_UNSYNCED;
            } else if (this.syncStatusClass === this.STATUS_CLASSNAME.SYNC_INCOMPLETE) {
                this.syncStatus      = this.STATUS.SYNCING;
                this.syncStatusClass = this.STATUS_CLASSNAME.SYNCING;
            }

            applyChange();
        });

        this.jobListFinishRefreshListener = this.$rootScope.$on(this.MESSAGING.REFRESH_JOBS_LIST_FINISH, (event) => {
            this.$log.log('[job-sync-status.controller.js] jobListFinishRefreshListener');
            if (this.syncStatus !== this.STATUS.SYNCING) {
                this.listRefreshed();
            }

            applyChange();
        });

        // Individual sync status should affect the overall
        this.assetBeingUploadedForJobListener = this.$rootScope.$on(this.MESSAGING.ASSET_BEING_UPLOADED_FOR_JOB, (event, status) => {
            // job start upload
            this.$log.log('[job-sync-status.controller.js] assetBeingUploadedForJobListener');

            this.syncStatus      = this.STATUS.SYNCING;
            this.syncStatusClass = this.STATUS_CLASSNAME.SYNCING;

            applyChange();
        });

        this.assetBeingDownloadedForJobListener = this.$rootScope.$on(this.MESSAGING.JOB_AVAILABLE_OFFLINE, (event, offline) => {
            // job start download
            this.$log.log('[job-sync-status.controller.js] assetBeingDownloadedForJobListener');

            this.syncStatus      = this.STATUS.SYNCING;
            this.syncStatusClass = this.STATUS_CLASSNAME.SYNCING;

            applyChange();
        });

        this.allAssetFinishedSyncingListener = this.$rootScope.$on(this.MESSAGING.ALL_JOB_ASSET_FINISHED_SYNCING, (event) => {
            // all job finish sync, need to check db status not override
            this.$log.log('[job-sync-status.controller.js] allAssetFinishedSyncingListener');

            let dbStatus = this.syncService.getOverallStatus();

            if (dbStatus.syncStatus === this.STATUS.UP_TO_DATE && this.STATUS_CLASSNAME.ONLINE_UP_TO_DATE) {
                // only change when db sync is finished
                this.syncStatus      = this.STATUS.UP_TO_DATE;
                this.syncStatusClass = this.STATUS_CLASSNAME.ONLINE_UP_TO_DATE;
            }

            applyChange();
        });


    }

    $onDestroy () {
        this.dbStartSyncListener();
        this.dbPauseSyncListener();
        this.deviceOfflineListener();
        this.deviceOnlineListener();
    }

    refreshJobList () {
        this.dbRefreshing();

        this.$rootScope.$emit(this.MESSAGING.REFRESH_JOBS_LIST);
    }

    // the pouchdb is refreshing
    dbRefreshing () {
        this.$log.log('refreshing');
        this.refreshButtonText = 'Refreshing';
        this.needRefresh       = false;
    }

    // pouchdb just got updated
    dbRefreshed () {
        this.$log.log('refreshed');
        this.refreshButtonText = 'Refresh Job List';
        this.needRefresh       = true;
    }

    // everything is refreshed
    listRefreshed () {
        this.$log.log('listRefreshed');
        this.refreshButtonText = 'Refresh Job List';
        this.needRefresh       = false;
    }
}

export default JobSyncStatusController;
