import _findIndex from 'lodash/findIndex';

class jobInformationController {
    constructor (
        $state,
        $stateParams,
        jobTitleFilter,
        $rootScope,
        UI_ENUMS
    ) {
        'ngInject';

        this.$state           = $state;
        this.$stateParams     = $stateParams;
        this.jobTitleFilter   = jobTitleFilter;
        this.$rootScope       = $rootScope;
        this.MESSAGING        = UI_ENUMS.MESSAGING;
    }

    $onInit () {
      this.houses = {
          Primary   : this.job.Primary,
          Secondary : this.job.Secondary
      };
    }

    handlePhotoCapture (photo, key, houseId) {
        if (houseId === this.houses.Primary.HouseId) {
            this.houses.Primary.Photo[key] = photo;
            this.houses.Primary = angular.copy(this.houses.Primary);
        } else {
            const houseIndex = _findIndex(this.houses.Secondary, {HouseId : houseId});
            this.houses.Secondary[houseIndex].Photo[key] = photo;
            this.houses.Secondary[houseIndex] = angular.copy(this.houses.Secondary[houseIndex]);
        }

        this
            .$rootScope
            .$emit(this.MESSAGING.UPDATE_HOUSE_PHOTO, {
                HouseId : houseId,
                photo,
                key
            });
    }


}

export default jobInformationController;
