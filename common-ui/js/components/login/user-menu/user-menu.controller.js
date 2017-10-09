class UserMenuController {
    constructor ($state, $transitions, AuthenticationService, DropdownService, UI_ENUMS) {
        'ngInject';

        this.$state                = $state;
        this.$transitions          = $transitions;
        this.AuthenticationService = AuthenticationService;
        this.DropdownService       = DropdownService;
        this.DROPDOWN_USER_MENU    = UI_ENUMS.DROPDOWN.USER_MENU;
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
            this.user
                = this
                    .AuthenticationService
                    .getUser();
        });
    }

    onLogout () {
        this
            .AuthenticationService
            .logout()
            .then(() => {
                this
                    .DropdownService
                    .closeDropdown(this.DROPDOWN_USER_MENU);

                this
                    .$state
                    .go('login');
            });
    }
}

export default UserMenuController;
