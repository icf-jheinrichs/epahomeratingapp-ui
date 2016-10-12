import template from './list-filter.html';
import controller from './list-filter.controller';

let listFilterComponent = {
    bindings : {
        'quantity' : '<',
        'criteria' : '<'
    },
    template,
    controller,
    controllerAs : 'listFilterCtrl'
};

export default listFilterComponent;
