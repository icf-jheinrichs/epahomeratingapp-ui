import moment from 'moment';

class ChecklistCommentsController {
    constructor ($log, $sanitize, AssetPathService, UI_ENUMS, CONTEXT, AuthenticationService, BASE_IMAGE_URL) {
        'ngInject';
        this.$log              = $log;
        this.$sanitize         = $sanitize;
        this.AssetPathService  = AssetPathService;
        this.BASE_IMAGE_URL    = BASE_IMAGE_URL;
        this.user              = AuthenticationService.getUserInfo();
        this.CONTEXT_IS_APP    = CONTEXT === UI_ENUMS.CONTEXT.APP;
    }

    $onInit () {
        this.$log.log('[ChecklistCommentsController] initialized');
        this.AssetPathService.getBaseURL('IMAGE').then(res => {
            this.imageUrl = res.url;
        });
        this.state             = 'list';
        this.id                = this.itemId.replace(/\s/g, '_');
        this.allowPhotoCapture = this.CONTEXT_IS_APP;
    }

    formatTimestamp (timestamp) {
        return moment(timestamp).format('MMMM Do YYYY, h:mm a');
    }

    setState (state) {
        this.state = state;

        this.newCommentText     = '';
        this.newCommentPhotoUrl = '';
    }

    handlePhotoCapture (photo) {
        this.newCommentPhotoUrl = photo;
    }

    postComment () {
        if (this.newCommentText || this.newCommentPhotoUrl !== '') {
            //TODO: make a stub user service that provides user id.
            const comment = {
                'PhotoUrl'  : this.newCommentPhotoUrl,
                'Comment'   : this.$sanitize(this.newCommentText),
                'User'      : this.user,
                'Timestamp' : moment().format()
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

export default ChecklistCommentsController;
