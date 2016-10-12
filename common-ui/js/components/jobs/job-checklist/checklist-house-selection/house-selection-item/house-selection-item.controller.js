class houseSelectionItemController {
    constructor (CameraService) {
        'ngInject';

        this.CameraService = CameraService;
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

        this.photoUrl = this.getPhotoUrl;
    }

    onEditPhoto (HouseId, $event) {
        let self = this;
        $event.preventDefault();
        $event.stopPropagation();

        this.CameraService
            .getPhoto()
            .then(function handleCamera (photo) {
                self.checklist.onUpdateHousePhoto(HouseId, photo);
            });
    }

    getPhotoUrl () {
        let photoUrl;

        if (this.house.Photo.length === 0) {
            photoUrl = 'img/job-photo-default.svg';
        } else {
            photoUrl = this.house.Photo[0];
        }

        return photoUrl;
    }
}

export default houseSelectionItemController;
