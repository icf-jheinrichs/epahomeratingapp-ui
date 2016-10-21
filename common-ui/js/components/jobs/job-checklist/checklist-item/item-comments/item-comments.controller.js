import moment from 'moment';

class ChecklistCommentsController {
    constructor (CameraService) {
        'ngInject';

        this.CameraService   = CameraService;

        //TODO: move this to constant
        this.defaultPhotoUrl = 'img/job-photo-default.svg';

        //TODO: move this to constant
        this.photoActionLabelEnum = {
            'ADD'    : 'Add Photo',
            'CHANGE' : 'Change Photo'
        };
    }

    $onInit () {
        this.showPopover        = false;
        this.state              = 'list';
        this.newCommentPhotoUrl = this.defaultPhotoUrl;
        this.photoActionLabel   = this.photoActionLabelEnum.ADD;
    }

    //TODO: create a popover directive and move all popover logic out of this controller
    togglePopover () {
        if (!this.showPopover) {
            this.state = 'list';
        }

        this.showPopover = !this.showPopover;
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

            // this.comments.push(comment);

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
