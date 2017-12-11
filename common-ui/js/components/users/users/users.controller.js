const SUCCESS = {
    type        : 'success',
    text        : 'User roles saved.',
    dismissable : false
};

const ERROR = {
    type        : 'error',
    text        : 'Error saving user roles.',
    dismissable : false
};

class UsersController {
    constructor (AuthorizationService) {
        'ngInject';

        this.AuthorizationService = AuthorizationService;
    }

    $onInit () {
        this.currentUserCognitoId
            = this
                .AuthorizationService
                .getUserId();

        this.organizaitonTypes
            = this
                .AuthorizationService
                .getOrganizationTypes();

        this.message = {};
    }

    formatName (user) {
        return `${user.FirstName} ${user.LastName}`;
    }

    handleSaveUsers () {
        this.message = {};

        this
            .onSaveUsers({
                users : this.users
            })
            .then(() => {
                this.message = SUCCESS;
            })
            .catch(() => {
                this.message = ERROR;
            });
    }
}

export default UsersController;
