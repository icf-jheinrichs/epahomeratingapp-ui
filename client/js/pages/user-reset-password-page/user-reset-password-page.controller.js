const USER_SETTINGS_ERROR = {
    type        : 'error',
    text        : 'An error occurred while trying to reset your password.',
    dismissable : false
};

const USER_SETTINGS_SUCCESS = {
    type        : 'success',
    text        : 'User password successfully updated.',
    dismissable : false
};

const USER_SETTINGS_NO_CHANGES = {
    type        : 'warning',
    text        : 'No changes made.',
    dismissable : false
};

class UserResetPasswordPageController {
    constructor (
        $log,
        $q,
        $state,
        AuthenticationService,
        UI_ENUMS,
        VALIDATION_PATTERN
    ) {
        'ngInject';

        this.$log                  = $log;
        this.$q                    = $q;
        this.AuthenticationService = AuthenticationService;
        this.$state                = $state;

        this.VALIDATION_MESSAGE    = UI_ENUMS.VALIDATION_MESSAGE;

        this.userNamePattern       = VALIDATION_PATTERN.USER_NAME;
        this.passwordPattern       = VALIDATION_PATTERN.PASSWORD;
        this.STATE_NAME            = UI_ENUMS.STATE_NAME;
    }

    onSubmit () {
        this.message = {};
        this.userSettings.newPassword.$setValidity('notEmpty', true);
        this.userSettings.confirmPassword.$setValidity('passwordsMatch', true);

        let userSettingsPromises = [];

        if (this.userSettings.userId.$valid
            && this.userSettings.confirmCode.$valid
            && this.newPassword
            && this.userSettings.confirmPassword.$valid
            && this.userSettings.newPassword.$valid
            && this.newPassword === this.confirmPassword) {

            userSettingsPromises.push(this.AuthenticationService.confirmPasswordReset(this.userId, this.confirmCode, this.newPassword));
        } else if (this.confirmPassword && this.newPassword === undefined) {
            this.userSettings.newPassword.$setDirty();
            this.userSettings.newPassword.$setValidity('notEmpty', false);
        } else if (this.newPassword !== this.confirmPassword) {
            this.userSettings.confirmPassword.$setDirty();
            this.userSettings.confirmPassword.$setValidity('passwordsMatch', false);
        }

        if (userSettingsPromises.length > 0) {
            this
                .$q
                .all(userSettingsPromises)
                .then(() => {
                    this.user    = this.AuthenticationService.getUser();
                    this.message = Object.assign({}, USER_SETTINGS_SUCCESS);
                    return this.userSettings.$setUntouched();
                })
                .then(response => {
                    return this
                                .$state
                                .go(this.STATE_NAME.LOGIN);
                })
                .catch((error) => {
                    this.message = Object.assign({}, USER_SETTINGS_ERROR);
                    this.message.text = error.message;
                });
        } else {
            this.message = Object.assign({}, USER_SETTINGS_NO_CHANGES);
        }
    }
}

export default UserResetPasswordPageController;
