import moment from 'moment';
import _isEmpty from 'lodash/isEmpty';

class Job {
    constructor (
        $location,
        $log,
        $rootScope,
        $scope,
        $timeout,
        JobHistoryService,
        jobTitleFilter,
        SyncService,
        CONTEXT,
        UI_ENUMS,
        AssetPathService
    ) {
        'ngInject';

        this.$location = $location;
        this.$log = $log;
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$timeout = $timeout;

        this.JobHistoryService = JobHistoryService;
        this.jobTitleFilter    = jobTitleFilter;
        this.syncService       = SyncService;

        this.DEFAULT_PHOTO = UI_ENUMS.IMAGES.DEFAULT_PHOTO;
        this.AssetPathService = AssetPathService;
        this.CONTEXT_IS_APP = CONTEXT === UI_ENUMS.CONTEXT.APP;
        this.CONTEXT_IS_ADMIN = CONTEXT === UI_ENUMS.CONTEXT.ADMIN;
        this.MESSAGING = UI_ENUMS.MESSAGING;
        this.SYNC_STATUS = UI_ENUMS.SYNC_STATUS;
        this.UI_ENUMS = UI_ENUMS;
    }

    $onInit () {
        this.AssetPathService.getBaseURL('IMAGE', true).then(res => {
            this.BASE_IMAGE_URL = res.url;
        });
        if (this.job.RatingType === 'energy-star') {
            this.RatingType = 'ENERGY STAR';
            this.RatingTypeClass = 'label-energy-star';
        } else {
            this.RatingType = 'HERS Rating';
            this.RatingTypeClass = 'label-hers-rating';
        }

        this.isSample = this.job.SampleSize > 1;
        this.setLastUpdate();
    }

    setBulkOperationStatus () {
        // force wait for digest cycle so that jobs.controller recieves up-to-date array of marked status.
        this.$timeout(() => {
            this.onSetBulkOperationStatus();
        }, 0);
    }

    hideJobStatus () {
        return _isEmpty(this.$location.$$search);
    }

    setLastUpdate () {
        let lastUpdateRecord = this.job.History[this.job.History.length - 1];

        if (Array.isArray(lastUpdateRecord)) {
            lastUpdateRecord = this.JobHistoryService.deserializeHistoryRecord(lastUpdateRecord);

            this.lastUpdate = {
                DateTime    : lastUpdateRecord.DateTime,
                Description : this.JobHistoryService.getShortDescription(lastUpdateRecord)
            };
        } else {
            this.lastUpdate = {
                DateTime    : lastUpdateRecord.DateTime,
                Description : lastUpdateRecord.Description
            };
        }
    }

    get JobTitle () {
        return this.jobTitleFilter(this.job.Primary.AddressInformation);
    }

    get lastUpdateTime () {
        return moment(this.lastUpdate.DateTime).format('h:mm a, MMM Do YYYY');
    }

    get lastUpdateType () {
        return this.lastUpdate.Description;
    }
}

export default Job;
