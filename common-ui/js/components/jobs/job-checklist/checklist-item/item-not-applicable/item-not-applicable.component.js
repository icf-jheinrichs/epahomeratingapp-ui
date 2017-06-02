import template from './item-not-applicable.html';
import controller from './item-not-applicable.controller';
// import './job.scss';

let checklistItemNotApplicableComponent = {
    bindings : {
        housePlanIds         : '<',
        itemId               : '@',
        itemCategory         : '@',
        itemCategoryProgress : '@'
    },
    template,
    controller,
    controllerAs : 'checklistItemCtrl'
};

export default checklistItemNotApplicableComponent;
