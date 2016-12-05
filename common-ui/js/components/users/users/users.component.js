import template from './users.html';
import controller from './users.controller';

let usersComponent = {
    bindings : {
        users : '<'
    },
    template,
    controller,
    controllerAs : 'usersCtrl'
};

export default usersComponent;
