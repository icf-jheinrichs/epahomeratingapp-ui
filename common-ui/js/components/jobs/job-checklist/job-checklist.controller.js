import _ from 'lodash';

class JobChecklistController {
    constructor ($stateParams, JobsService) {
        'ngInject';

        this.id                  = $stateParams.id;
        this.JobsService         = JobsService;

        this.houses              = {
            Primary   : this.job.Primary,
            Secondary : this.job.Secondary
        };
        this.selectedHouse       = $stateParams.houseId;
    }

    getRatingTypeClass () {
        //TODO: make this better
        return (this.job.RatingType === 'energy-star') ? 'label-energy-star' : 'label-hers-rating';
    }

    $onInit () {
        //TODO: make this better
        this.RatingTypeLabel = (this.job.RatingType === 'energy-star') ? 'Energy Star' : 'HERS Rating';
    }

    onUpdateHousePhoto (HouseId, photo) {
        let secondaryIndex;

        if (this.job.Primary.HouseId === HouseId) {
            this.job.Primary.Photo = [photo];
        } else {
            secondaryIndex = _.findIndex(this.job.Secondary, {HouseId : HouseId});

            this.job.Secondary[secondaryIndex].Photo = [photo];
        }

        this
            .JobsService
            .put(this.job);
    }
}

export default JobChecklistController;
