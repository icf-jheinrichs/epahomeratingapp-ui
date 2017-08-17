import template from './sub-item-default.html';
import controller from './sub-item-default.controller';

let subItemDefaultComponent = {
    bindings : {
        itemId               : '@',
        itemCategory         : '@',
        itemCategoryProgress : '@',
        isOmitted            : '<'
    },
    template,
    controller,
    controllerAs : 'subItemDefaultController'
};

export default subItemDefaultComponent;
