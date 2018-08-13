class houseSelectionItemController {
    constructor (jobTitleFilter, UI_ENUMS, BASE_IMAGE_URL) {
        'ngInject';

        this.jobTitleFilter  = jobTitleFilter;

        this.defaultPhotoUrl = UI_ENUMS.IMAGES.DEFAULT_PHOTO;
        this.BASE_IMAGE_URL  = BASE_IMAGE_URL;
    }

    $onInit () {
        this.photoUrl = (this.house.Photo[0]) ? `${this.BASE_IMAGE_URL}${this.house.Photo[0]}` : this.defaultPhotoUrl;
    }

    handlePhotoCapture (photo) {
        this.onUpdateHousePhoto({
            HouseId : this.house.HouseId,
            photo
        });
    }

    get HouseTitle () {
        return this.jobTitleFilter(this.house.AddressInformation);
    }
}

export default houseSelectionItemController;
