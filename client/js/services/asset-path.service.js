class AssetPathService {
    constructor (BASE_IMAGE_URL) {
        'ngInject';

        this.BASE_IMAGE_URL = BASE_IMAGE_URL;
    }

    getBaseURL (assetType = 'IMAGE', assetIdentifier = null) {
        return this.BASE_IMAGE_URL;
    }
}

export default AssetPathService;
