import template from './user-register-page.html';
import controller from './user-register-page.controller';

let userRegisterPageComponent = {
    bindings : {
        user : '<'
    },
    template,
    controller,
    controllerAs : 'userRegisterPageCtrl'
};

export default userRegisterPageComponent;
