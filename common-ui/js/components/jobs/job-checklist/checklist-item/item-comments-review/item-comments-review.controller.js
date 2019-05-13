import moment from 'moment';

class ChecklistCommentsReviewController {
    constructor (UI_ENUMS, CONTEXT, $log, AssetPathService, AuthenticationService, BASE_IMAGE_URL, SanitizeService) {
        'ngInject';
        this.$log = $log;
        this.BASE_IMAGE_URL = BASE_IMAGE_URL;
        this.AssetPathService = AssetPathService;
        this.user = AuthenticationService.getUserInfo();
        this.CONTEXT_IS_APP = CONTEXT === UI_ENUMS.CONTEXT.APP;
        this.SanitizeService   = SanitizeService;
    }

    $onInit () {
        this.$log.log('[ChecklistCommentsReviewController] initialized');
        this.imageUrl = this.AssetPathService.getBaseURL('IMAGE');
        this.state = 'list';
        this.id = this.itemId.replace(/\s/g, '_');
        this.allowPhotoCapture = this.CONTEXT_IS_APP;
    }

    formatTimestamp (timestamp) {
        return moment(timestamp).format('MMMM Do YYYY, h:mm a');
    }

    setState (state) {
        this.state = state;

        this.newCommentText = '';
        this.newCommentPhotoUrl = '';
    }

    handlePhotoCapture (photo) {
        this.newCommentPhotoUrl = photo;
    }

    postComment () {
        if (this.newCommentText || this.newCommentPhotoUrl !== '') {
            this.newCommentPhotoUrl ? this.imageUrl = this.AssetPathService.getBaseURL('IMAGE', this.newCommentPhotoUrl) : null;
            //TODO: make a stub user service that provides user id.
            const comment = {
                PhotoUrl  : this.newCommentPhotoUrl,
                Comment   : this.SanitizeService.sanitize(this.newCommentText),
                User      : this.user,
                Timestamp : moment().format()
            };

            this.onComment({
                comment : comment
            });

            this.postCommentForm.$setPristine();
            this.postCommentForm.$setUntouched();
        }

        this.setState('list');
    }
}

export default ChecklistCommentsReviewController;
