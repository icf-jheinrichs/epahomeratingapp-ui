import _findIndex from 'lodash/findIndex';

class UserMenuController {
    constructor ($state, $stateParams, $transitions, AuthenticationService, AuthorizationService, DropdownService, CONTEXT, UI_ENUMS) {
        'ngInject';

        this.$state                       = $state;
        this.$stateParams                 = $stateParams;
        this.$transitions                 = $transitions;
        this.AuthenticationService        = AuthenticationService;
        this.AuthorizationService         = AuthorizationService;
        this.DropdownService              = DropdownService;
        this.DROPDOWN_USER_COMPANIES_MENU = UI_ENUMS.DROPDOWN.USER_COMPANIES_MENU;
        this.CONTEXT_IS_APP               = CONTEXT === UI_ENUMS.CONTEXT.APP;
    }

    menuIsVisible () {
        let isVisible = false;

        if (this.userCompanies && this.userCompanies.length > 0) {
            isVisible = true;
        }

        return isVisible;
    }

    setCurrentOrganization (O_ID) {
        this.DropdownService.closeDropdown(this.DROPDOWN_USER_COMPANIES_MENU);
        this
            .AuthorizationService
            .setCurrentOrganization(O_ID);

        this.currentOrganization = this.findOrganization(O_ID);

        this.$state.transitionTo(this.$state.current, this.$stateParams, {reload : true, inherit : false, notify : true});
    }

    findOrganization (O_ID) {
        let organizationIndex = _findIndex(this.userCompanies, {O_ID : O_ID});

        return this.userCompanies[organizationIndex];
    }

    $onInit () {
        this.userCompanies = this.AuthorizationService.getUserCompanies();
        //TODO: see if there's a better way to do this - maybe w/ broadcast or emit.
        this
            .$transitions
            .onSuccess(true, (redirectToLogin) => {
                this.userCompanies
                    = this
                        .AuthorizationService
                        .getUserCompanies();

                this.currentOrganizationId
                    = this
                        .AuthorizationService
                        .getCurrentOrganizationId();

                this.currentOrganization = this.findOrganization(this.currentOrganizationId);
            });
    }
}

export default UserMenuController;
