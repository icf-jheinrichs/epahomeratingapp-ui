class UserMenuController {
    constructor ($state, $transitions, AuthenticationService, AuthorizationService, DropdownService, CONTEXT, UI_ENUMS) {
        'ngInject';

        this.$state                 = $state;
        this.$transitions           = $transitions;
        this.AuthenticationService  = AuthenticationService;
        this.AuthorizationService   = AuthorizationService;
        this.DropdownService        = DropdownService;
        this.DROPDOWN_USER_MENU     = UI_ENUMS.DROPDOWN.USER_MENU;
        this.CONTEXT_IS_APP         = CONTEXT === UI_ENUMS.CONTEXT.APP;

        this.DIAGNOSTICS_STATE_NAME = UI_ENUMS.STATE_NAME.DIAGNOSTICS;
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
            .AuthorizationService
            .clearState();

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

    onDiagnostics () {
        this
            .DropdownService
            .closeDropdown(this.DROPDOWN_USER_MENU);

        this
            .$state
            .go(this.DIAGNOSTICS_STATE_NAME);
    }
}

export default UserMenuController;
