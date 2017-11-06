
class AssetCacheService {
    constructor () {
        'ngInject';
    }

    getAssetListForJob (jobID) {
        return ['123/images/456/789/image0.jpg', '123/images/456/789/image1.jpg'];
    }

    getDownloadingAssets () {
        return [{
            company  : '010',
            job      : '101',
            house    : '202',
            filename : 'image3.jpg'
        }];
    }

    getUploadingAssets () {
        return [{
            company  : '010',
            job      : '101',
            house    : '202',
            filename : 'image4.jpg'
        }];
    }

    getDownloadErrorAssets () {
        return [{
            company  : '010',
            job      : '101',
            house    : '202',
            filename : 'image5.jpg'
        }];
    }

    getUploadErrorAssets () {
        return [{
            company  : '010',
            job      : '101',
            house    : '202',
            filename : 'image6.jpg'
        }];
    }

}

export default AssetCacheService;
