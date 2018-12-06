import moment from 'moment';

class ChecklistCommentsController {
    constructor (
        $sanitize,
        UI_ENUMS,
        CONTEXT,
        AuthenticationService,
        AssetPathService
    ) {
        'ngInject';

        this.$sanitize = $sanitize;

        this.BASE_IMAGE_URL = '';
        this.AssetPathService = AssetPathService;
        this.user = AuthenticationService.getUserInfo();
        this.CONTEXT_IS_APP = CONTEXT === UI_ENUMS.CONTEXT.APP;
    }

    $onInit () {
        this.AssetPathService.getBaseURL('IMAGE', true).then(res => {
            this.BASE_IMAGE_URL = res.url;
        });
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
            //TODO: make a stub user service that provides user id.
            const comment = {
                PhotoUrl  : this.newCommentPhotoUrl,
                Comment   : this.$sanitize(this.newCommentText),
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

export default ChecklistCommentsController;
