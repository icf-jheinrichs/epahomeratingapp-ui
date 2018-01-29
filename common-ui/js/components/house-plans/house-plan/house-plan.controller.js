class HousePlanController {
    constructor (HousePlansService, S3_CONFIG) {
        'ngInject';

        this.HousePlansService = HousePlansService;
        this.s3Bucket          = `${S3_CONFIG.S3_BUCKET_NAME_PREFIX}-rating-company`;
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
        this.HousePlansService
            .downloadRemXml(this.housePlan)
            .then((response) => {
                this.downloadUrl = response;
                this.showDownloadModal = true;
            });
    }

    hideModalDownload () {
        this.showDownloadModal = false;
    }
}

export default HousePlanController;
