import template from './item-default.html';
import controller from './item-default.controller';
// import './job.scss';

let checklistItemDefaultComponent = {
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
    controllerAs : 'checklistItemCtrl'
};

export default checklistItemDefaultComponent;
