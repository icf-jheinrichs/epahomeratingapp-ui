class UserMenuController {
    constructor ($state, $transitions, AuthenticationService) {
        'ngInject';

        this.$state                = $state;
        this.$transitions          = $transitions;
        this.AuthenticationService = AuthenticationService;
    }

    menuIsVisible () {
        return this.user.userId.length > 0;
    }

    $onInit () {
        this.user = this.AuthenticationService.getUser();
        //TODO: see if there's a better way to do this - maybe w/ broadcast or emit.
        this.$transitions.onSuccess(true, (redirectToLogin) => {
            this.user = this.AuthenticationService.getUser();
        });
    }

    //TODO: all dropdown stuff belongs in a directive
    toggleDropDown () {
        this.showActionsDropDown = !this.showActionsDropDown;
    }

    //TODO: all dropdown stuff belongs in a directive
    hideDropDown () {
        this.showActionsDropDown = false;
    }

    onLogout () {
        this.hideDropDown();

        this
            .AuthenticationService
            .logout()
            .then((data) => {
                this.$state.go('login');
            });
    }
}

export default UserMenuController;
