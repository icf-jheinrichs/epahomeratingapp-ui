import template from './login-page.html';

let loginPageComponent = {
    bindings : {
        returnTo : '<'
    },
    template,
    controllerAs : 'loginPageCtrl'
};

export default loginPageComponent;
