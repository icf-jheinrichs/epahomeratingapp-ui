class PhotoCaptureController {
    constructor (CameraService, UI_ENUMS, BASE_IMAGE_URL) {
        'ngInject';

        this.CameraService   = CameraService;

        this.defaultPhotoUrl = UI_ENUMS.IMAGES.DEFAULT_PHOTO;
        this.BASE_IMAGE_URL  = BASE_IMAGE_URL;

        this.photoActionLabelEnum = {
            'ADD'    : 'Add Photo',
            'CHANGE' : 'Change Photo'
        };
    }

    $onInit () {
        this.photoUrl         = this.photo || this.defaultPhotoUrl;
        this.photoActionLabel = (this.photoUrl === this.defaultPhotoUrl) ? this.photoActionLabelEnum.ADD : this.photoActionLabelEnum.CHANGE;
    }

    addPhoto () {
        this.CameraService
            .getPhoto()
            .then((photo) => {
                this.photoUrl         = photo;
                this.photoActionLabel = this.photoActionLabelEnum.CHANGE;

                this.onPhotoCapture({
                    photo
                });

                this.photoActionLabel = this.photoActionLabelEnum.CHANGE;
            });
    }
}

export default PhotoCaptureController;
