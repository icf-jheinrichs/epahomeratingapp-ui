class houseSelectionItemController {
    constructor (jobTitleFilter, $q, $log, AssetPathService, UI_ENUMS, BASE_IMAGE_URL) {
        'ngInject';
        this.BASE_IMAGE_URL   = BASE_IMAGE_URL;
        this.jobTitleFilter   = jobTitleFilter;
        this.$q               = $q;
        this.$log             = $log;
        this.defaultPhotoUrl  = UI_ENUMS.IMAGES.DEFAULT_PHOTO;
        this.AssetPathService = AssetPathService;
    }

    $onInit () {
        this.$log.log('[HouseSelectionItemController] initialized');
        this.photoUrl = this.getPhotoUrl();
    }

    getPhotoUrl () {
        let photoUrl;
        let index = 0;

        while (!photoUrl && index < this.house.Photo.length) {
            photoUrl = this.house.Photo[index];
            index += 1;
        }
        if (photoUrl) {
            this.imageUrl = this.AssetPathService.getBaseURL('IMAGE', photoUrl);
            return this.imageUrl + photoUrl;
        } else {
            return this.defaultPhotoUrl;
        }
    }

    showElevationPhotos () {
        this.onUpdateHousePhoto({
            HouseId : this.house.HouseId
        });
    }

    get HouseTitle () {
        return this.jobTitleFilter(this.house.AddressInformation);
    }

    $onChanges (changes) {
        if (changes.house && !changes.house.isFirstChange()) {
            this.house = changes.house.currentValue;
            this.photoUrl = this.getPhotoUrl();
        }
    }
}

export default houseSelectionItemController;
