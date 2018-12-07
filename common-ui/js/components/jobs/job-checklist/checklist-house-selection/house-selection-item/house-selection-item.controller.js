class houseSelectionItemController {
    constructor (jobTitleFilter, $q, AssetPathService, UI_ENUMS) {
        'ngInject';

        this.jobTitleFilter = jobTitleFilter;
        this.$q = $q;
        this.defaultPhotoUrl = UI_ENUMS.IMAGES.DEFAULT_PHOTO;
        this.AssetPathService = AssetPathService;
        this.imageBaseUrl = '';
        this.photoUrl = '';
    }

    $onInit () {
        this.AssetPathService.getBaseURL('IMAGE', true).then(res => {
            this.imageBaseUrl = res.url;
            this.photoUrl = this.getPhotoUrl();
        });
    }

    getPhotoUrl () {
        let photoUrl;
        let index = 0;

        while (!photoUrl && index < this.house.Photo.length) {
            photoUrl = this.house.Photo[index];

            index += 1;
        }
        return photoUrl ? this.imageBaseUrl + photoUrl : this.defaultPhotoUrl;
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
