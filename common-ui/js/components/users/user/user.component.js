import template from './user.html';
import controller from './user.controller';

let userComponent = {
    bindings : {
        user : '<'
    },
    template,
    controller,
    controllerAs : 'userCtrl'
};

export default userComponent;
