const USER_SETTINGS_ERROR = {
    type        : 'error',
    text        : 'An error occurred while trying to create your account.',
    dismissable : false
};

const USER_SETTINGS_SUCCESS = {
    type        : 'success',
    text        : 'User account successfully created.',
    dismissable : false
};

const USER_SETTINGS_NO_CHANGES = {
    type        : 'warning',
    text        : 'No changes made.',
    dismissable : false
};

class UserRegisterPageController {
    constructor (
        $log,
        $q,
        $state,
        $stateParams,
        AuthenticationService,
        UserCompanyService,
        UI_ENUMS,
        VALIDATION_PATTERN
    ) {
        'ngInject';

        this.$log                  = $log;
        this.$q                    = $q;
        this.UserCompanyService    = UserCompanyService;
        this.AuthenticationService = AuthenticationService;
        this.$stateParams          = $stateParams;
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
            && this.newPassword
            && this.userSettings.confirmPassword.$valid
            && this.userSettings.temporaryPassword.$valid
            && this.userSettings.newPassword.$valid
            && this.newPassword !== this.temporaryPassword
            && this.newPassword === this.confirmPassword) {

            let user = {
                'userId'   : this.$stateParams.C_ID,
                'password' : this.temporaryPassword
            };

            let preferredAttribute = {
                'preferred_username'  : this.userId.toLowerCase()
            };

            userSettingsPromises.push(this.AuthenticationService.login(user, this.newPassword, preferredAttribute));

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
                    this.userSettings.$setUntouched();
                    return this.AuthenticationService.logout();
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

export default UserRegisterPageController;
