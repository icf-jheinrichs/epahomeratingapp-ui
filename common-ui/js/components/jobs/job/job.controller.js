import _sample from 'lodash/sample';
import moment from 'moment';

class JobController {
    constructor (UI_ENUMS, jobTitleFilter, BASE_IMAGE_URL) {
        'ngInject';

        this.DEFAULT_PHOTO     = UI_ENUMS.IMAGES.DEFAULT_PHOTO;
        this.BASE_IMAGE_URL    = BASE_IMAGE_URL;
        this.jobTitleFilter    = jobTitleFilter;
    }

    $onInit () {
        this.RatingType        = (this.job.RatingType === 'energy-star') ? 'Energy Star' : 'HERS Rating';
        this.secondaryQuantity = this.job.Secondary.length;
        this.isSample          = this.secondaryQuantity > 0;
        this.jobPhoto          = (this.job.Primary.Photo.length) ? this.BASE_IMAGE_URL + this.job.Primary.Photo[0] : this.DEFAULT_PHOTO;

        //TODO: use real data - remove import of _sample if not needed (likely not)
        this.SyncStatus        = _sample(['Synced', 'Unsynced']);
    }

    getRatingTypeClass () {
        //TODO: make this better
        return (this.job.RatingType === 'energy-star') ? 'label-energy-star' : 'label-hers-rating';
    }

    hasStatusLabel () {
        return (this.job.ReturnedFromInternal || this.job.ReturnedFromProvider);
    }

    get JobTitle () {
        return this.jobTitleFilter(this.job.Primary.AddressInformation);
    }

    //TODO: determine if we need user friendly ID in addition to DB id.
    get id () {
        return this.job._id.substring(0, 8).toUpperCase();
    }

    get lastUpdateTime () {
        return moment(this.job.History[this.job.History.length - 1].DateTime).format('MMM Do YYYY, h:mm:ss a');
    }

    get lastUpdateType () {
        return this.job.History[this.job.History.length - 1].Description;
    }
}

export default JobController;
