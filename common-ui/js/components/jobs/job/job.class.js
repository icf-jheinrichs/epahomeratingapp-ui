import moment from 'moment';
import _isEmpty from 'lodash/isEmpty';

class Job {
    constructor (
        $location,
        $log,
        $rootScope,
        $scope,
        $timeout,
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

        this.jobTitleFilter = jobTitleFilter;
        this.syncService = SyncService;

        this.DEFAULT_PHOTO = UI_ENUMS.IMAGES.DEFAULT_PHOTO;
        this.AssetPathService = AssetPathService;
        this.CONTEXT_IS_APP = CONTEXT === UI_ENUMS.CONTEXT.APP;
        this.CONTEXT_IS_ADMIN = CONTEXT === UI_ENUMS.CONTEXT.ADMIN;
        this.MESSAGING = UI_ENUMS.MESSAGING;
        this.SYNC_STATUS = UI_ENUMS.SYNC_STATUS;
        this.UI_ENUMS = UI_ENUMS;
    }

    $onInit () {
        this.$log.log('[JobClass] initialized');
        this.AssetPathService.getBaseURL('IMAGE').then(res => {
            this.imageUrl = res.url;
        });
        if (this.job.RatingType === 'energy-star') {
            this.RatingType = 'ENERGY STAR';
            this.RatingTypeClass = 'label-energy-star';
        } else {
            this.RatingType = 'HERS Rating';
            this.RatingTypeClass = 'label-hers-rating';
        }

        this.isSample = this.job.SampleSize > 1;
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

    get JobTitle () {
        return this.jobTitleFilter(this.job.Primary.AddressInformation);
    }

    get lastUpdateTime () {
        return moment(
            this.job.History[this.job.History.length - 1].DateTime
        ).format('h:mm a, MMM Do YYYY');
    }

    get lastUpdateType () {
        return this.job.History[this.job.History.length - 1].Description;
    }
}

export default Job;
