class houseSelectionItemController {
    constructor (CameraService, UI_ENUMS, jobTitleFilter, BASE_IMAGE_URL) {
        'ngInject';

        this.CameraService  = CameraService;
        this.DEFAULT_PHOTO  = UI_ENUMS.IMAGES.DEFAULT_PHOTO;
        this.BASE_IMAGE_URL = BASE_IMAGE_URL;
        this.jobTitleFilter = jobTitleFilter;

        //TODO: move this to constant
        this.photoActionLabelEnum = {
            'ADD'    : 'Add Photo',
            'CHANGE' : 'Change Photo'
        };
    }

    updatePhoto (HouseId, $event) {
        let self = this;

        $event.preventDefault();
        $event.stopPropagation();

        this.CameraService
            .getPhoto()
            .then(function handleCamera (photo) {
                self.onUpdateHousePhoto({
                    HouseId,
                    photo
                });

                self.photoActionLabel = self.photoActionLabelEnum.CHANGE;
            });
    }

    get photoUrl () {
        let photoUrl;

        if (this.house.Photo.length === 0) {
            photoUrl = this.DEFAULT_PHOTO;
            this.photoActionLabel = this.photoActionLabelEnum.ADD;
        } else {
            photoUrl = this.BASE_IMAGE_URL + this.house.Photo[0];
            this.photoActionLabel = this.photoActionLabelEnum.CHANGE;
        }

        return photoUrl;
    }

    get HouseTitle () {
        return this.jobTitleFilter(this.house.AddressInformation);
    }
}

export default houseSelectionItemController;
