class houseSelectionItemController {
    constructor (jobTitleFilter) {
        'ngInject';

        this.jobTitleFilter = jobTitleFilter;
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
