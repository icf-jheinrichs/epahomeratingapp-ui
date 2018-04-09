import template from './user-reset-password-page.html';
import controller from './user-reset-password-page.controller';

let userResetPasswordPageComponent = {
    bindings : {
        user : '<'
    },
    template,
    controller,
    controllerAs : 'userResetPasswordPageCtrl'
};

export default userResetPasswordPageComponent;
