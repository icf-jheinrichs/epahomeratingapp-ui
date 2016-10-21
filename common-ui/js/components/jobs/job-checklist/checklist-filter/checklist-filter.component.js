import template from './checklist-filter.html';
import controller from './checklist-filter.controller';

let jobChecklistFilterComponent = {
    bindings : {
        checklistItemsQuantity : '@'
    },
    template,
    controller,
    controllerAs : 'jobChecklistFilterCtrl'
};

export default jobChecklistFilterComponent;
