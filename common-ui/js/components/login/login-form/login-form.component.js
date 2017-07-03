import template from './login-form.html';
import controller from './login-form.controller';

let loginFormComponent = {
    bindings : {
        isBusy        : '<',
        login         : '&',
        setAction     : '&',
        user          : '=',
        userIdPattern : '<'
    },
    template,
    controller,
    controllerAs : 'loginFormCtrl'
};

export default loginFormComponent;
