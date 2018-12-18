class AssetPathService {
    constructor ($q, $log, BASE_IMAGE_URL, SyncService) {
        'ngInject';

        this.$q = $q;
        this.$log = $log;
        this.syncService = SyncService;
        this.BASE_IMAGE_URL = BASE_IMAGE_URL;
    }

    getBaseURL (assetType = 'IMAGE') {
        this.$log.log(`[AssetPathService] context_is_admin, url: ${this.BASE_IMAGE_URL}`);
        // assume online and keep the same functionality
        return this.$q((resolve, reject) => {
            resolve({
                url    : this.BASE_IMAGE_URL,
                type   : assetType,
                status : 200
            });
        });
    }
}

export default AssetPathService;
