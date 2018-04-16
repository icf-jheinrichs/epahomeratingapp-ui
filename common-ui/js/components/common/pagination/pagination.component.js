import template from './pagination.html';
import controller from './pagination.controller';

let paginationComponent = {
    bindings : {
        'quantity'  : '<',
        'onSetPage' : '&'
    },
    template,
    controller,
    controllerAs : 'paginationCtrl'
};

export default paginationComponent;
