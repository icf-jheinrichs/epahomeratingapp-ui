import {PATTERN} from '../../epahomeratingapp.config.js';

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

class UserRegisterPageController {
    constructor (
        $log,
        $q,
        UserCompanyService,
        UI_ENUMS) {
        'ngInject';

        this.$log                  = $log;
        this.$q                    = $q;
        this.UserCompanyService    = UserCompanyService;

        this.passwordPattern       = PATTERN.PASSWORD;
    }
}

export default UserRegisterPageController;
