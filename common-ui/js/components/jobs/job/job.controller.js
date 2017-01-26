import _sample from 'lodash/sample';

class JobController {
    constructor (CONFIG, jobTitleFilter) {
        'ngInject';

        this.DEFAULT_PHOTO     = CONFIG.DEFAULT_PHOTO;
        this.jobTitleFilter    = jobTitleFilter;
    }

    $onInit () {
        this.RatingType        = (this.job.RatingType === 'energy-star') ? 'Energy Star' : 'HERS Rating';
        this.secondaryQuantity = this.job.Secondary.length;
        this.isSample          = this.secondaryQuantity > 0;
        this.jobPhoto          = (this.job.Primary.Photo.length) ? this.job.Primary.Photo[0] : this.DEFAULT_PHOTO;

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
}

export default JobController;
