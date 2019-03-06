import template from './users.html';
import controller from './users.controller';

import './users.scss';

let usersComponent = {
    bindings : {
        users       : '<',
        onSaveUser  : '&',
        onSaveUsers : '&'
    },
    template,
    controller,
    controllerAs : 'usersCtrl'
};

export default usersComponent;
