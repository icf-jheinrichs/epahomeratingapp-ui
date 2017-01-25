export default function jobTitleFilter () {
    return function jobTitle (AddressInformation) {
        let title = '';

        if (AddressInformation.Address1) {
            title = AddressInformation.Address1;
            title += ` ${AddressInformation.CityMunicipality || ''}`;
            title += `, ${AddressInformation.StateCode || ''}`;
            title += ` ${AddressInformation.ZipCode || ''}`;
        } else if (AddressInformation.CommunityName) {
            title = AddressInformation.CommunityName;
            title += (AddressInformation.LotNo) ? `, Lot ${AddressInformation.LotNo}` : '';
        } else {
            title = `Manual ID: ${AddressInformation.ManualId}`;
        }

        return title;
    };
}
