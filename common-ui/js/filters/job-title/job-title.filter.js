export default function jobTitleFilter () {
    return function jobTitle (AddressInformation) {
        let title = AddressInformation.Address1 || '';
        let manualIdSeparator = (AddressInformation.CommunityName) ? '|' : '';

        title += (AddressInformation.CityMunicipality) ? `, ${AddressInformation.CityMunicipality}` : '';
        title += (AddressInformation.StateCode) ? `, ${AddressInformation.StateCode}` : '';
        title += (AddressInformation.ZipCode) ? ` ${AddressInformation.ZipCode}` : '';

        title += (AddressInformation.CommunityName) ? `<br /> ${AddressInformation.CommunityName}` : '';
        title += (AddressInformation.LotNo) ? `, ${AddressInformation.LotNo}` : '';
        title += (AddressInformation.ManualId) ? ` ${manualIdSeparator} ID: ${AddressInformation.ManualId}` : '';

        return title;
    };
}
