export default function jobTitleFilter () {
    return function jobTitle (AddressInformation, omitHtml = false) {
        // let title = AddressInformation.Address1 || '';
        // let manualIdSeparator = (AddressInformation.CommunityName) ? '|' : '';

        // title += (AddressInformation.CityMunicipality) ? `, ${AddressInformation.CityMunicipality}` : '';
        // title += (AddressInformation.StateCode) ? `, ${AddressInformation.StateCode}` : '';
        // title += (AddressInformation.ZipCode) ? ` ${AddressInformation.ZipCode}` : '';

        // title += (AddressInformation.CommunityName) ? `<br /> ${AddressInformation.CommunityName}` : '';
        // title += (AddressInformation.LotNo) ? `, ${AddressInformation.LotNo}` : '';
        // title += (AddressInformation.ManualId) ? ` ${manualIdSeparator} ID: ${AddressInformation.ManualId}` : '';

        let address                 = [];
        let addressString           = '';
        let community               = [];
        let communityString         = '';
        let communityManualIdString = '';
        let titleString             = '';

        let spanOpen                = omitHtml ? ' ' : '<span class="ellipsis">';
        let spanClose               = omitHtml ? ' ' : '</span>';

        if (AddressInformation.Address1) {
            address.push(AddressInformation.Address1);
        }

        if (AddressInformation.CityMunicipality) {
            address.push(AddressInformation.CityMunicipality);
        }

        if (AddressInformation.StateCode) {
            address.push(AddressInformation.StateCode);
        }

        addressString = address.join(', ');

        if (AddressInformation.ZipCode) {
            addressString += ` ${AddressInformation.ZipCode}`;
        }

        titleString = `${spanOpen}${addressString}${spanClose}`;

        if (AddressInformation.CommunityName) {
            community.push(AddressInformation.CommunityName);
        }

        if (AddressInformation.LotNo) {
            community.push(`Lot ${AddressInformation.LotNo}`);
        }

        communityString = community.join(', ');
        communityManualIdString = communityString;

        if (communityManualIdString.length > 0 && AddressInformation.ManualId) {
            communityManualIdString += ` | ${AddressInformation.ManualId}`;
        } else if (AddressInformation.ManualId) {
            communityManualIdString = AddressInformation.ManualId;
        }

        if (titleString.length > 0 && communityManualIdString) {
            titleString += `${spanOpen}${communityManualIdString}${spanClose}`;
        } else if (communityManualIdString) {
            titleString = `${spanOpen}${communityManualIdString}${spanClose}`;
        }

        return titleString;
    };
}
