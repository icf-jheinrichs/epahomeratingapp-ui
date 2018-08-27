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
            HouseId : this.house.HouseId,
            photo,
            key     : elevationPhotoKey
        });
    }

    hideElevationPhotos () {
        this.elevationPhotosVisible = false;
    }

    get HouseTitle () {
        return this.jobTitleFilter(this.house.AddressInformation);
    }
}

export default houseElevationPhotosController;
