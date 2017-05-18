import moment from 'moment';


class JobSyncStatusController {
    constructor ($log, $rootScope, UI_ENUMS) {
        this.STATUS = {
            LAST_UPDATED    : 'Last Updated ${now}',
            UP_TO_DATE      : 'Up to Date',
            SYNCING         : 'Syncing',
            SYNC_INCOMPLETE : 'Sync Incomplete'
        };

        this.STATUS_CLASSNAME = {
            OFFLINE           : 'sync-status-offline',              // grey w/ checkmark
            ONLINE_UP_TO_DATE : 'sync-status-online',               // green w/ checkmark
            SYNCING           : 'sync-status-syncing',              // blue border
            LOCAL_UNSYNCED    : 'sync-status-local-unsynced',       // yellow with -
            SYNC_INCOMPLETE   : 'sync-status-incomplete'            // red with x
        };

        this.$log       = $log;
        this.$rootScope = $rootScope;

        this.MESSAGING  = UI_ENUMS.MESSAGING;
    }

    $onInit () {
        this.syncStatus = '';
        this.syncStatusClass = '';

        this.dbStartSyncListener = this.$rootScope.$on(this.MESSAGING.DB_START_SYNC, (event) => {
            this.$log.log('[job-sync-status.controller.js] dbStartSyncListener');

            this.syncStatus      = this.STATUS.SYNCING;
            this.syncStatusClass = this.STATUS_CLASSNAME.SYNCING;
        });

        this.dbPauseSyncListener = this.$rootScope.$on(this.MESSAGING.DB_PAUSE_SYNC, (event) => {
            this.$log.log('[job-sync-status.controller.js] dbPauseSyncListener');

            this.syncStatus      = this.STATUS.UP_TO_DATE;
            this.syncStatusClass = this.STATUS_CLASSNAME.ONLINE_UP_TO_DATE;
        });

        this.deviceOfflineListener = this.$rootScope.$on(this.MESSAGING.DEVICE_OFFLINE, (event) => {
            this.$log.log('[job-sync-status.controller.js] deviceOfflineListener');

            if (this.syncStatusClass === this.STATUS_CLASSNAME.ONLINE_UP_TO_DATE) {
                let now = moment(new Date()).format('MMM Do YYYY, h:mm:ss a');

                this.syncStatus      = this.STATUS.LAST_UPDATED.replace('${now}', now);
                this.syncStatusClass = this.STATUS_CLASSNAME.OFFLINE;
            } else if (this.syncStatusClass === this.STATUS_CLASSNAME.SYNCING || this.syncStatusClass === this.STATUS_CLASSNAME.LOCAL_UNSYNCED) {
                this.syncStatus      = this.STATUS.SYNC_INCOMPLETE;
                this.syncStatusClass = this.STATUS_CLASSNAME.SYNC_INCOMPLETE;
            }
        });

        this.deviceOnlineListener = this.$rootScope.$on(this.MESSAGING.DEVICE_ONLINE, (event, jobs) => {
            this.$log.log(`[job-sync-status.controller.js] deviceOnlineListener ${jobs.uploadingJobs}`);

            if (this.syncStatusClass === this.STATUS_CLASSNAME.OFFLINE) {
                this.syncStatus      = this.STATUS.UP_TO_DATE;
                this.syncStatusClass = this.STATUS_CLASSNAME.ONLINE_UP_TO_DATE;
            } else if (jobs.uploadingJobs.length > 0) {
                let now = moment(new Date()).format('MMM Do YYYY, h:mm:ss a');

                this.syncStatus      = this.STATUS.LAST_UPDATED.replace('${now}', now);
                this.syncStatusClass = this.STATUS_CLASSNAME.LOCAL_UNSYNCED;
            } else if (this.syncStatusClass === this.STATUS_CLASSNAME.SYNC_INCOMPLETE) {
                this.syncStatus      = this.STATUS.SYNCING;
                this.syncStatusClass = this.STATUS_CLASSNAME.SYNCING;
            }
        });
    }

    $onDestroy () {
        this.dbStartSyncListener();
        this.dbPauseSyncListener();
        this.deviceOfflineListener();
        this.deviceOnlineListener();
    }
}

export default JobSyncStatusController;
