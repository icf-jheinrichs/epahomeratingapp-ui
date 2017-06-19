import template from './sub-item-default.html';
import controller from './sub-item-default.controller';
// import './job.scss';

import './sub-item-default.scss';

let subItemDefaultComponent = {
    bindings : {
        itemId               : '@',
        itemCategory         : '@',
        itemCategoryProgress : '@',
        checklistItem        : '<',
        response             : '<',
        comments             : '<'
    },
    template,
    controller,
    controllerAs : 'subItemDefaultController'
};

export default subItemDefaultComponent;
