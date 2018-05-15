const USER_SETTINGS_ERROR = {
    type        : 'error',
    text        : 'An error occurred while trying to update your settings.',
    dismissable : false
};

const USER_SETTINGS_SUCCESS = {
    type        : 'success',
    text        : 'User settings successfully updated.',
    dismissable : false
};

const USER_SETTINGS_NO_CHANGES = {
    type        : 'warning',
    text        : 'No changes made.',
    dismissable : false
};

class UserPageController {
    constructor (
        $log,
        $q,
        AuthenticationService,
        AuthorizationService,
        DialogService,
        UserCompanyService,
        UI_ENUMS,
        VALIDATION_PATTERN
    ) {
        'ngInject';

        this.$log                  = $log;
        this.$q                    = $q;
        this.AuthenticationService = AuthenticationService;
        this.AuthorizationService  = AuthorizationService;

        this.VALIDATION_MESSAGE    = UI_ENUMS.VALIDATION_MESSAGE;

        this.userNamePattern       = VALIDATION_PATTERN.USER_NAME;
        this.passwordPattern       = VALIDATION_PATTERN.PASSWORD;
    }

    $onInit () {
        this.message      = {};

        this.user         = this.AuthenticationService.getUser();
        this.userName     = this.user.preferredUsername || this.user.userId;
        this.userMESAData = this.AuthorizationService.getUserMESAData();
    }

    onSubmit () {
        this.message = {};
        this.userSettings.newPassword.$setValidity('notEmpty', true);
        this.userSettings.confirmPassword.$setValidity('passwordsMatch', true);

        let userSettingsPromises = [];

        if (this.userSettings.userName.$valid && this.user.preferredUsername !== this.userName) {
            let attribute = [{
                Name  : 'preferred_username',
                Value : this.userName.toLowerCase()
            }];

            userSettingsPromises.push(this.AuthenticationService.setPreferredUsername(attribute));
        }

        if (this.currentPassword
            && this.userSettings.currentPassword.$valid
            && this.newPassword
            && this.userSettings.newPassword.$valid
            && this.userSettings.confirmPassword.$valid
            && this.newPassword === this.confirmPassword) {

            userSettingsPromises.push(this.AuthenticationService.setUserPassword(this.currentPassword, this.newPassword));
        } else if (this.currentPassword && this.newPassword === undefined) {
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

                    this.currentPassword = '';
                    this.newPassword     = '';
                    this.confirmPassword = '';

                    this.userSettings.$setUntouched();
                })
                .catch((error) => {
                    this.message = Object.assign({}, USER_SETTINGS_ERROR);
                });
        } else {
            this.message = Object.assign({}, USER_SETTINGS_NO_CHANGES);
        }
    }
}

export default UserPageController;
