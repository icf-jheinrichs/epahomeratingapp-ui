class houseSelectionItemController {
    constructor (jobTitleFilter, UI_ENUMS, BASE_IMAGE_URL) {
        'ngInject';

        this.jobTitleFilter  = jobTitleFilter;

        this.defaultPhotoUrl = UI_ENUMS.IMAGES.DEFAULT_PHOTO;
        this.BASE_IMAGE_URL  = BASE_IMAGE_URL;
    }

    $onInit () {
        this.elevationPhotosVisible = false;
        this.photoUrl               = this.getPhotoUrl();
    }

    getPhotoUrl () {
        let photoUrl;
        let index = 0;

        while (!photoUrl && index < this.house.Photo.length) {
            photoUrl = this.house.Photo[index];

            index += 1;
        }

        return photoUrl || this.defaultPhotoUrl;
    }

    showElevationPhotos () {
        this.elevationPhotosVisible = true;
    }

    handlePhotoCapture (photo, key) {
        this.house.Photo[key] = photo;
        this.photoUrl         = this.getPhotoUrl();

        this.onUpdateHousePhoto({
            HouseId : this.house.HouseId,
            photo   : photo.photo,
            key     : photo.elevationPhotoKey
        });
    }

    get HouseTitle () {
        return this.jobTitleFilter(this.house.AddressInformation);
    }
}

export default houseSelectionItemController;
