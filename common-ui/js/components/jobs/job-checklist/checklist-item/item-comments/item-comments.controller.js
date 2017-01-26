import moment from 'moment';

class ChecklistCommentsController {
    constructor (CameraService, CONFIG) {
        'ngInject';

        this.CameraService   = CameraService;

        this.defaultPhotoUrl = CONFIG.DEFAULT_PHOTO;

        //TODO: move this to constant
        this.photoActionLabelEnum = {
            'ADD'    : 'Add Photo',
            'CHANGE' : 'Change Photo'
        };
    }

    $onInit () {
        this.state              = 'list';
        this.newCommentPhotoUrl = this.defaultPhotoUrl;
        this.photoActionLabel   = this.photoActionLabelEnum.ADD;
    }

    formatTimestamp (timestamp) {
        return moment(timestamp).format('MMMM Do YYYY, h:mm a');
    }

    setState (state) {
        this.state = state;
    }

    addPhoto () {
        this.CameraService
            .getPhoto()
            .then((photo) => {
                this.newCommentPhotoUrl = photo;
                this.photoActionLabel   = this.photoActionLabelEnum.CHANGE;
            });
    }

    postComment () {
        if (this.newCommentText || this.defaultPhotoUrl !== this.newCommentPhotoUrl) {
            //TODO: make a stub user service that provides user id.
            let comment = {
                'PhotoUrl'  : (this.defaultPhotoUrl !== this.newCommentPhotoUrl) ? this.newCommentPhotoUrl : '',
                'Comment'   : this.newCommentText,
                'User'      : '12345678',
                'Timestamp' : moment().format()
            };

            this.onComment({
                comment : comment
            });

            this.newCommentText = '';
            this.newCommentPhotoUrl = this.defaultPhotoUrl;

            this.postCommentForm.$setPristine();
            this.postCommentForm.$setUntouched();
        }

        this.setState('list');
    }
}

export default ChecklistCommentsController;
