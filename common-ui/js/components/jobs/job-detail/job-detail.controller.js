class JobDetailController {
    constructor (RATING_TYPES, $element) {
        'ngInject';

        this.ratingTypeOptions = RATING_TYPES;
        this.$element          = $element;
    }

    $onInit () {
        this.isSampleset = this.job.Secondary.length > 0;

        this.currentLocation = this.job.Primary.HouseId;
    }

    validateHousePlan () {
        return this.housePlanFileList.length > 0;
    }

    validateRatingType () {
        return this.housePlanFileList.length > 0;
    }

    setTab (houseId) {
        this.currentLocation = houseId;
    }

    ariaCurrent (houseId) {
        return this.currentLocation === houseId;
    }
}

export default JobDetailController;
