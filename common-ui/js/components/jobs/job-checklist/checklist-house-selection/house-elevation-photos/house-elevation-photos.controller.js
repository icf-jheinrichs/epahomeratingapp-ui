class houseElevationPhotosController {
    constructor (jobTitleFilter, UI_ENUMS) {
        'ngInject';

        this.ELEVATION_PHOTOS = UI_ENUMS.ELEVATION_PHOTOS.map((elevationPhoto) => {
            return {
                Key      : elevationPhoto.Key,
                Name     : elevationPhoto.Name,
                Callback : (photo) => {
                    this.handlePhotoCapture(photo, elevationPhoto.Key);
                }
            };
        });

        this.jobTitleFilter = jobTitleFilter;
    }

    handlePhotoCapture (photo, elevationPhotoKey) {
        this.onUpdateHousePhoto({
            photo,
            key     : elevationPhotoKey,
            houseId : this.house.HouseId
        });
        this.onUpdateHousePhoto(photo, elevationPhotoKey, this.house.HouseId);
    }

    hideElevationPhotos () {
        this.elevationPhotosVisible = false;
    }

    get HouseTitle () {
        return this.jobTitleFilter(this.house.AddressInformation);
    }

    $onChanges (changes) {
        if (changes.photos && !changes.photos.isFirstChange()) {
            this.photos = changes.photos.currentValue;
        }
    }
}

export default houseElevationPhotosController;
