class UserMenuController {
    constructor ($state, $transitions, AuthenticationService) {
        'ngInject';

        this.$state                = $state;
        this.$transitions          = $transitions;
        this.AuthenticationService = AuthenticationService;
    }

    menuIsVisible () {
        let isVisible = false;

        if (this.user && this.user.userId.length > 0) {
            isVisible = true;
        }

        return isVisible;
    }

    $onInit () {
        this.user = this.AuthenticationService.getUser();
        //TODO: see if there's a better way to do this - maybe w/ broadcast or emit.
        this.$transitions.onSuccess(true, (redirectToLogin) => {
            this.user = this.AuthenticationService.getUser();
        });
    }

    onLogout () {
        this
            .AuthenticationService
            .logout()
            .then((data) => {
                this.$state.go('login');
            });
    }
}

export default UserMenuController;
