class houseSelectionItemController {
    constructor () {
        'ngInject';

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

    onEditPhoto (HouseId, $event) {
        $event.preventDefault();
        $event.stopPropagation();
    }
}

export default houseSelectionItemController;
