
const TABLE_COLUMNS = ['Company', 'Job', 'House', 'Filename'];

class JobsChecklistPageController {
    constructor ($log, AssetCacheService, PouchDBService, $interval, JobsService) {
        'ngInject';

        this.AssetCacheService = AssetCacheService;
        this.PouchDBService    = PouchDBService;
        this.JobsService       = JobsService;
        this.$interval         = $interval;
        this.$log              = $log;
        this.TABLE_COLUMNS     = TABLE_COLUMNS;

        this.jobIDs            = [];
        this.assetList         = [];
        this.uploadingList     = [];
        this.downloadingList   = [];
        this.uploadErrorList   = [];
        this.downloadErrorList = [];
        this.syncingDB         = [];

        let self = this;
        this.JobsService.getAllIDs()
            .then((result) => {
                self.jobIDs = result;
            })
            .catch((error) => {
                self.$log.log('get job ids error');
                self.$log.log(error);
            });

        this.refresh();
        this.$interval(this.refresh.bind(this), 5000);
    }

    refresh () {
        this.refreshLocalAssets();
        this.refreshUploadingAssets();
        this.refreshDownloadingAssets();
        this.refreshingErrorAssets();
        this.refreshDBInSync();
    }

    refreshDBInSync () {
        this.syncingDB = this.PouchDBService.getSyncingDB();
    }

    refreshLocalAssets () {
        let self = this;
        self.assetList = [];
        this.jobIDs.forEach((jobID) => {
            let assetsForJob = self.AssetCacheService.getAssetListForJob(jobID);
            assetsForJob = self.getAssetInfo(assetsForJob);

            for (let index in assetsForJob) {
                self.assetList.push(assetsForJob[index]);
            }
        });
    }

    refreshUploadingAssets () {
        this.uploadingList = this.AssetCacheService.getUploadingAssets();
    }

    refreshDownloadingAssets () {
        this.downloadingList = this.AssetCacheService.getDownloadingAssets();
    }

    refreshingErrorAssets () {
        this.downloadErrorList = this.AssetCacheService.getDownloadErrorAssets();
        this.uploadErrorList = this.AssetCacheService.getUploadErrorAssets();
    }

    getAssetInfo (assetsForJob) {
        let result = [];

        assetsForJob.forEach((asset) => {
            let assetParts = asset.split('/');
            result.push({
                company  : assetParts[0],
                job      : assetParts[2],
                house    : assetParts[3],
                filename : assetParts[4]
            });
        });

        return result;
    }


}

export default JobsChecklistPageController;
