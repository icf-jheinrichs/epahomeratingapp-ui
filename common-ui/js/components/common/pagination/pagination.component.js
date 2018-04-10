import template from './pagination.html';
import controller from './pagination.controller';

let paginationComponent = {
    bindings : {
        'quantity' : '<'
    },
    template,
    controller,
    controllerAs : 'paginationCtrl'
};

export default paginationComponent;
