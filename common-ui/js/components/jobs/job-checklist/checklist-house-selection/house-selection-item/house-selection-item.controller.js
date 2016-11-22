class houseSelectionItemController {
    constructor (CameraService, CONFIG) {
        'ngInject';

        this.CameraService = CameraService;
        this.DEFAULT_PHOTO = CONFIG.DEFAULT_PHOTO;

        //TODO: move this to constant
        this.photoActionLabelEnum = {
            'ADD'    : 'Add Photo',
            'CHANGE' : 'Change Photo'
        };
    }

    $onInit () {
        let AddressInformation = this.house.AddressInformation;

        //TODO: move this to service
        if (AddressInformation.Address1) {
            this.HouseTitle = AddressInformation.Address1;
            this.HouseTitle += ` ${AddressInformation.CityMunicipality || ''}`;
            this.HouseTitle += `, ${AddressInformation.StateCode || ''}`;
            this.HouseTitle += ` ${AddressInformation.ZipCode || ''}`;
        } else if (AddressInformation.CommunityName) {
            this.HouseTitle = AddressInformation.CommunityName;
            this.HouseTitle += (AddressInformation.LotNo) ? `, Lot ${AddressInformation.LotNo}` : '';
        } else {
            this.HouseTitle = `Manual ID: ${AddressInformation.ManualId}`;
        }
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

    getPhotoUrl () {
        let photoUrl;

        if (this.house.Photo.length === 0) {
            photoUrl = this.DEFAULT_PHOTO;
            this.photoActionLabel = this.photoActionLabelEnum.ADD;
        } else {
            photoUrl = this.house.Photo[0];
            this.photoActionLabel = this.photoActionLabelEnum.CHANGE;
        }

        return photoUrl;
    }
}

export default houseSelectionItemController;
