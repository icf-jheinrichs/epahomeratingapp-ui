class UsersController {
    constructor (AuthorizationService) {
        'ngInject';

        this.AuthorizationService = AuthorizationService;
    }

    $onInit () {
        this.organizaitonTypes = this.AuthorizationService.getOrganizationTypes();
    }

    formatName (user) {
        return `${user.FirstName} ${user.LastName}`;
    }

    handleSaveUsers () {
        this.onSaveUsers({
            users : this.users
        });
    }
}

export default UsersController;
