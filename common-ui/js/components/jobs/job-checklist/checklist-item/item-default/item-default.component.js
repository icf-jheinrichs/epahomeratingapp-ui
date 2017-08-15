import template from './item-default.html';
import controller from './item-default.controller';
// import './job.scss';

let checklistItemDefaultComponent = {
    bindings : {
        itemId               : '@',
        itemCategory         : '@',
        itemCategoryProgress : '@'
    },
    template,
    controller,
    controllerAs : 'checklistItemCtrl'
};

export default checklistItemDefaultComponent;
