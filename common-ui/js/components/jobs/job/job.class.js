import moment from 'moment';
import _isEmpty from 'lodash/isEmpty';

class Job {
    constructor ($log, $rootScope, $location, $scope, jobTitleFilter, CONTEXT, UI_ENUMS, BASE_IMAGE_URL) {
        'ngInject';

        this.$log              = $log;
        this.$rootScope        = $rootScope;
        this.$scope            = $scope;
        this.$location      = $location;

        this.jobTitleFilter    = jobTitleFilter;
        this.DEFAULT_PHOTO     = UI_ENUMS.IMAGES.DEFAULT_PHOTO;
        this.BASE_IMAGE_URL    = BASE_IMAGE_URL;

        this.CONTEXT_IS_APP    = CONTEXT === UI_ENUMS.CONTEXT.APP;
        this.CONTEXT_IS_ADMIN  = CONTEXT === UI_ENUMS.CONTEXT.ADMIN;
        this.DIALOG            = UI_ENUMS.DIALOG.MAKE_JOB_OFFLINE;
        this.MESSAGING         = UI_ENUMS.MESSAGING;
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
    }

    setBulkOperationStatus () {
        this.onSetBulkOperationStatus();
    }

    hideJobStatus () {
        return _isEmpty(this.$location.$$search);
    }

    get JobTitle () {
        return this.jobTitleFilter(this.job.Primary.AddressInformation);
    }

    get lastUpdateTime () {
        return moment(this.job.History[this.job.History.length - 1].DateTime).format('h:mm a, MMM Do YYYY');
    }

    get lastUpdateType () {
        return this.job.History[this.job.History.length - 1].Description;
    }
}

export default Job;
