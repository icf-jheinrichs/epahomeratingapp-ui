import template from './item-static-pressure.html';
import controller from './item-static-pressure.controller';

let checklistItemMrfStaticPressureComponent = {
    bindings : {
        itemId               : '@',
        itemCategory         : '@',
        itemCategoryProgress : '@'
    },
    template,
    controller,
    controllerAs : 'checklistItemCtrl'
};

export default checklistItemMrfStaticPressureComponent;
