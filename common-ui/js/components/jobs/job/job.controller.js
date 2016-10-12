class JobController {
    $onInit () {
        let AddressInformation = this.job.Primary.AddressInformation;

        //TODO: move this to service
        if (AddressInformation.Address1) {
            this.JobTitle = AddressInformation.Address1;
            this.JobTitle += ` ${AddressInformation.CityMunicipality || ''}`;
            this.JobTitle += `, ${AddressInformation.StateCode || ''}`;
            this.JobTitle += ` ${AddressInformation.ZipCode || ''}`;
        } else if (AddressInformation.CommunityName) {
            this.JobTitle = AddressInformation.CommunityName;
            this.JobTitle += (AddressInformation.LotNo) ? `, Lot ${AddressInformation.LotNo}` : '';
        } else {
            this.JobTitle = `Manual ID: ${AddressInformation.ManualId}`;
        }

        this.RatingType        = (this.job.RatingType === 'energy-star') ? 'Energy Star' : 'HERS Rating';
        this.secondaryQuantity = this.job.Secondary.length;
        this.isSample          = this.secondaryQuantity > 0;
    }

    getRatingTypeClass () {
        //TODO: make this better
        return (this.job.RatingType === 'energy-star') ? 'label-energy-star' : 'label-hers-rating';
    }

    hasStatusLabel () {
        return (this.job.ReturnedFromInternal || this.job.ReturnedFromProvider);
    }
}

export default JobController;
