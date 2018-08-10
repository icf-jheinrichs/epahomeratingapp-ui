import template from './user-reset-password-page.html';
import controller from './user-reset-password-page.controller';

import './user-reset-password-page.scss';

let userResetPasswordPageComponent = {
    bindings : {
        user : '<'
    },
    template,
    controller,
    controllerAs : 'userResetPasswordPageCtrl'
};

export default userResetPasswordPageComponent;
