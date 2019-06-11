import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';

class jobInformationController {
    constructor (
        $state,
        $stateParams,
        UI_ENUMS,
        jobTitleFilter
    ) {
        'ngInject';

        this.$state           = $state;
        this.$stateParams     = $stateParams;
        this.UI_ENUMS         = UI_ENUMS;
        this.jobTitleFilter   = jobTitleFilter;
    }

    $onInit () {
      this.houses = {
          Primary   : this.job.Primary,
          Secondary : this.job.Secondary
      };
      this.houseId = this.$stateParams.houseId;
      this.elevationPhotos = this.houses.Primary.Photo;
      this.elevationPhotosVisible = true;
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
