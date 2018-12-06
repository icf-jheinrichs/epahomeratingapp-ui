class PhotoCaptureController {
    constructor (CameraService, UI_ENUMS, CONTEXT, AssetPathService) {
        'ngInject';

        this.CameraService = CameraService;
        this.AssetPathService = AssetPathService;

        this.defaultPhotoUrl = UI_ENUMS.IMAGES.DEFAULT_PHOTO;
        this.BASE_IMAGE_URL = '';

        this.photoActionLabelEnum = {
            ADD    : 'Add Photo',
            CHANGE : 'Change Photo'
        };

        this.CONTEXT_IS_APP = CONTEXT === UI_ENUMS.CONTEXT.APP;
    }

    // Call assetpath service to get baseURL

    $onInit () {
        this.AssetPathService.getBaseURL('IMAGE', true).then(res => {
            this.BASE_IMAGE_URL = res.url;
        });
        this.allowAddPhoto = this.CONTEXT_IS_APP;
        this.photoUrl = this.photo
            ? `${this.BASE_IMAGE_URL}${this.photo}`
            : this.defaultPhotoUrl;
        this.photoActionLabel
            = this.photoUrl === this.defaultPhotoUrl
                ? this.photoActionLabelEnum.ADD
                : this.photoActionLabelEnum.CHANGE;
    }

    addPhoto ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        this.CameraService.getPhoto().then(photo => {
            this.photoUrl = `${this.BASE_IMAGE_URL}${photo}`;
            this.photoActionLabel = this.photoActionLabelEnum.CHANGE;

            this.onPhotoCapture({
                photo
            });

            this.photoActionLabel = this.photoActionLabelEnum.CHANGE;
        });
    }

    $onChanges (changes) {
        if (changes.photo && !changes.photo.isFirstChange()) {
            if (!changes.photo.currentValue) {
                this.photoUrl = this.defaultPhotoUrl;
                this.photoActionLabel = this.photoActionLabelEnum.ADD;
            } else {
                this.photo = changes.photo.currentValue;
                this.photoUrl = `${this.BASE_IMAGE_URL}${this.photo}`;
                this.photoActionLabel = this.photoActionLabelEnum.CHANGE;
            }
        }
    }

    get isCollapsed () {
        return (
            this.collapsed === 'true' && this.photoUrl === this.defaultPhotoUrl
        );
    }
}

export default PhotoCaptureController;
