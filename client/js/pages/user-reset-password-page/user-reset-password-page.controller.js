import {PATTERN} from '../../epahomeratingapp.config.js';

class UserResetPasswordPageController {
    constructor (
        $log,
        $q,
        AuthenticationService,
        UI_ENUMS) {
        'ngInject';

        this.$log                  = $log;
        this.$q                    = $q;
        this.AuthenticationService = AuthenticationService;

        this.passwordPattern       = PATTERN.PASSWORD;
    }
}

export default UserResetPasswordPageController;
