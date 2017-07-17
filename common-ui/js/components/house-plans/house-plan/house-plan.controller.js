class HousePlanController {

    constructor (HousePlansService) {
        this.HousePlansService = HousePlansService;
    }

    $onChanges (changes) {
        if (changes.housePlan && !changes.housePlan.isFirstChange()) {
            this.housePlan = changes.housePlan.currentValue;
        }

        this.showDownloadModal = false;
    }

    get housePlanTitle () {
        let title = '';

        if (this.housePlan && this.housePlan.SubplanName !== undefined) {
            let titleDivider = (this.housePlan.SubplanName.length) ? ' - ' : '';
            title = this.housePlan.Name + titleDivider + this.housePlan.SubplanName;
        }

        return title;
    }

    onDownloadRequest () {
        console.log('download called');
        this.HousePlansService
            .downloadRemXml(this.housePlan)
            .then((response) => {
                console.log(response);
                this.downloadUrl = response;
                this.showDownloadModal = true;
            });
    }

    hideModalDownload () {
        this.showDownloadModal = false;
    }
}

export default HousePlanController;
