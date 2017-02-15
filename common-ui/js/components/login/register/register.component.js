import template from './register.html';
import controller from './register.controller';

let registerComponent = {
    bindings : {
        login         : '&',
        setAction     : '&',
        user          : '=',
        userIdPattern : '<'
    },
    template,
    controller,
    controllerAs : 'registerCtrl'
};

export default registerComponent;
