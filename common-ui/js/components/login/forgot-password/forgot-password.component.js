import template from './forgot-password.html';
import controller from './forgot-password.controller';

let forgotPasswordComponent = {
    bindings : {
        resetPassword : '&',
        setAction     : '&',
        user          : '=',
        userIdPattern : '<'
    },
    template,
    controller,
    controllerAs : 'forgotPasswordCtrl'
};

export default forgotPasswordComponent;
