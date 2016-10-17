import template from './checklist-item.html';
// import itemMrfTemplate from './item-mrf/item-mrf.stub.html';
import controller from './checklist-item.controller';

let checklistItemComponent = {
    bindings     : {
        itemId               : '@',
        itemCategory         : '@',
        itemCategoryProgress : '@',
        response             : '<',
        comments             : '<',
        homePerformance      : '<'
    },
    template,
    controller,
    controllerAs : 'checklistItemStubCtrl'
};

export default checklistItemComponent;
