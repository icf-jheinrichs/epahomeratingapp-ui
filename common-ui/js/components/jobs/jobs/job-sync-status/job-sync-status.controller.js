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

        this.syncStatus = status.syncStatus;
        this.syncStatusClass = status.syncStatusClass;

        if (this.syncStatus === this.STATUS.LAST_UPDATED) {
            let now = moment(new Date()).format('MMM Do YYYY, h:mm:ss a');
            this.syncStatus = this.STATUS.LAST_UPDATED.replace(':now:', now);
        }

        this.dbStartSyncListener = this.$rootScope.$on(this.MESSAGING.DB_START_SYNC, (event) => {
            this.$log.log('[job-sync-status.controller.js] dbStartSyncListener');

            this.syncStatus      = this.STATUS.SYNCING;
            this.syncStatusClass = this.STATUS_CLASSNAME.SYNCING;

            let self = this;
            _defer(function afterDigest () {
                self.$scope.$apply();
            });
        });

        this.dbPauseSyncListener = this.$rootScope.$on(this.MESSAGING.DB_PAUSE_SYNC, (event) => {
            this.$log.log('[job-sync-status.controller.js] dbPauseSyncListener');

            this.syncStatus      = this.STATUS.UP_TO_DATE;
            this.syncStatusClass = this.STATUS_CLASSNAME.ONLINE_UP_TO_DATE;

            let self = this;
            _defer(function afterDigest () {
                self.$scope.$apply();
            });
        });

        this.deviceOfflineListener = this.$rootScope.$on(this.MESSAGING.DEVICE_OFFLINE, (event) => {
            this.$log.log('[job-sync-status.controller.js] deviceOfflineListener');

            if (this.syncStatusClass === this.STATUS_CLASSNAME.ONLINE_UP_TO_DATE) {
                let now = moment(new Date()).format('MMM Do YYYY, h:mm:ss a');

                this.syncStatus      = this.STATUS.LAST_UPDATED.replace(':now:', now);
                this.syncStatusClass = this.STATUS_CLASSNAME.OFFLINE;
            } else if (this.syncStatusClass === this.STATUS_CLASSNAME.SYNCING || this.syncStatusClass === this.STATUS_CLASSNAME.LOCAL_UNSYNCED) {
                this.syncStatus      = this.STATUS.SYNC_INCOMPLETE;
                this.syncStatusClass = this.STATUS_CLASSNAME.SYNC_INCOMPLETE;
            }

            let self = this;
            _defer(function afterDigest () {
                self.$scope.$apply();
            });
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

            let self = this;
            _defer(function afterDigest () {
                self.$scope.$apply();
            });
        });
    }

    $onDestroy () {
        this.dbStartSyncListener();
        this.dbPauseSyncListener();
        this.deviceOfflineListener();
        this.deviceOnlineListener();
    }

    refreshJobList () {
        this
            .$rootScope
            .$emit(this.MESSAGING.REFRESH_JOBS_LIST);
    }
}

export default JobSyncStatusController;
