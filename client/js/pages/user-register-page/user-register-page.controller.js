import {PATTERN} from '../../epahomeratingapp.config.js';

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
