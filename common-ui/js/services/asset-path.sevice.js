class AssetPathService {
    constructor ($log, $q, CONTEXT, UI_ENUMS, BASE_IMAGE_URL) {
        this.$log = $log;
        this.$q = $q;

        this.BASE_IMAGE_URL = BASE_IMAGE_URL;
        this.CONTEXT_IS_APP = CONTEXT === UI_ENUMS.CONTEXT.APP;
        this.CONTEXT_IS_ADMIN = CONTEXT === UI_ENUMS.CONTEXT.ADMIN;
    }

    getBaseURL (assetType = '', online = false) {
        if (this.CONTEXT_IS_ADMIN) {
            // assume online and keep the same functionality
            return this.$q((resolve, reject) => {
                this.$log.warn('GETTING BASEURL, CONTEXT_IS_ADMIN');
                resolve({
                    url    : this.BASE_IMAGE_URL,
                    type   : assetType,
                    status : 200
                });
            });
        }
        return this.$q((resolve, reject) => {
            // CONTEXT_IS_APP: check and handle logic
            // Image: return remoteURL if online, otherwise localURL
            // PDF: download to the app's local cache
            this.$log.warn('GETTING BASEURL, CONTEXT_IS_APP');
            switch (assetType) {
            case 'IMAGE':
                // handle photo logic
                this.$log.log('[AssetPathService] case Photo');
                if (online) {
                    resolve({
                        url    : this.BASE_IMAGE_URL,
                        type   : assetType,
                        status : 200
                    });
                } else {
                    resolve({
                        url    : '',
                        type   : assetType,
                        status : 404
                    });
                }
                break;
            case 'PDF':
                // handle pdf download to local cache
                this.$log.log('[AssetPathService] case PDF');
                // TODO: download PDF to local cache
                resolve({
                    url    : this.BASE_IMAGE_URL + '/pdfs',
                    type   : assetType,
                    status : 200
                });
                break;
            default:
                reject({
                    error : {
                        status  : 500,
                        message :
                                '[AssetPathService] invalid Asset type: '
                                + assetType
                    }
                });
            }
        });
    }
}

export default AssetPathService;
