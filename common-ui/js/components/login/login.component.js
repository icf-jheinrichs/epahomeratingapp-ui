import template from './login.html';
import controller from './login.controller';

import './login.scss';

let loginComponent = {
    bindings : {
        returnTo : '<'
    },
    template,
    controller,
    controllerAs : 'loginCtrl'
};

export default loginComponent;
