import template from './checklist-item.html';
// import itemMrfTemplate from './item-mrf/item-mrf.stub.html';
import controller from './checklist-item.controller';

let checklistItemComponent = {
    bindings     : {
        checklistItem : '<'
    },
    template,
    controller,
    controllerAs : 'checklistItemCtrl'
};

export default checklistItemComponent;
