const _cloneDeep = require('lodash/cloneDeep');

const SUCCESS = {
    type        : 'success',
    text        : 'User saved.',
    dismissable : false
};

const ERROR = {
    type        : 'error',
    text        : 'Error saving user.',
    dismissable : false
};

class UsersController {
    constructor ($timeout, AuthorizationService, ModalService, UI_ENUMS) {
        'ngInject';

        this.$timeout             = $timeout;
        this.ModalService         = ModalService;
        this.AuthorizationService = AuthorizationService;
        this.MODAL_EDIT_USER      = UI_ENUMS.MODAL.EDIT_USER;
        this.isSaving             = false;
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

    openEditUserModal (CognitoId) {
        this.message = {};

        const editUser = this.users.find((user) => {
            return user.CognitoId === CognitoId;
        });

        this.editUser = _cloneDeep(editUser);
        this.$timeout(() => {
            this.ModalService.openModal(this.MODAL_EDIT_USER);
        }, 0);
    }

    saveUser (editedUserData) {
        this.isSaving = true;

        this.
            onSaveUser({
                user : editedUserData
            })
            .then(() => {
                const userIndex = this.users.findIndex((user) => {
                    return user.CognitoId === editedUserData.CognitoId;
                });

                this.users[userIndex].authorizations.Rater    = editedUserData.authorizations.Rater;
                this.users[userIndex].authorizations.Admin    = editedUserData.authorizations.Admin;
                this.users[userIndex].authorizations.Provider = editedUserData.authorizations.Provider;

                this.message = SUCCESS;
            })
            .catch(() => {
                this.message = ERROR;
            })
            .finally(() => {
                this.isSaving = false;
                this.ModalService.closeModal(this.MODAL_EDIT_USER);
            });
    }
}

export default UsersController;
