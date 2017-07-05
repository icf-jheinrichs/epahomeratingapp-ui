
/**
 * SyncService is the interface syncing the database.
 */
class SyncService {

    constructor (UI_ENUMS) {
        'ngInject';

        this.STATUS           = UI_ENUMS.STATUS;
        this.STATUS_CLASSNAME = UI_ENUMS.STATUS_CLASSNAME;
        this.SYNC_STATUS      = UI_ENUMS.SYNC_STATUS;
    }

    getOverallStatus () {
        return {
            syncStatus      : this.STATUS.SYNCING,
            syncStatusClass : this.STATUS_CLASSNAME.SYNCING
        };
    }

    getJobStatus (jobID) {
        return this.SYNC_STATUS.UP;
    }
}

export default SyncService;
