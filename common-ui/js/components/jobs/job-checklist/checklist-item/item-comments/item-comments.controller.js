import moment from 'moment';

class ChecklistCommentsController {
    constructor ($log, $sanitize, SanitizeService, AssetPathService, UI_ENUMS, CONTEXT, AuthenticationService, BASE_IMAGE_URL) {
        'ngInject';
        this.$log              = $log;
        this.$sanitize         = $sanitize;
        this.AssetPathService  = AssetPathService;
        this.BASE_IMAGE_URL    = BASE_IMAGE_URL;
        this.user              = AuthenticationService.getUserInfo();
        this.CONTEXT_IS_APP    = CONTEXT === UI_ENUMS.CONTEXT.APP;
        this.SanitizeService   = SanitizeService;
    }

    $onInit () {
        this.$log.log('[ChecklistCommentsController] initialized');
        this.imageUrl = this.AssetPathService.getBaseURL('IMAGE');
        this.state             = 'list';
        this.id                = this.itemId.replace(/\s/g, '_');
        this.allowPhotoCapture = this.CONTEXT_IS_APP;
    }

    formatTimestamp (timestamp) {
        return moment(timestamp).format('MMMM Do YYYY, h:mm a');
    }

    // getPhotoUrl (assetIdentifier) {
    //     this.AssetPathService.getBaseURL('IMAGE', assetIdentifier).then(res => {
    //         return res.url + assetIdentifier;
    //     });
    // }
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
            this.newCommentPhotoUrl ? this.imageUrl = this.AssetPathService.getBaseURL('IMAGE', this.newCommentPhotoUrl) : null;
            //TODO: make a stub user service that provides user id.
            const comment = {
                'PhotoUrl'  : this.newCommentPhotoUrl,
                'Comment'   : this.SanitizeService.sanitize(this.newCommentText),
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
