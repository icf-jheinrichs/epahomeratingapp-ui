import template from './item-total-duct-leakage-test-strategy.html';
import controller from './item-total-duct-leakage-test-strategy.controller';
// import './job.scss';

let checklistItemTotalDuctLeakageTestStrategyComponent = {
    bindings : {
        itemId               : '@',
        itemCategory         : '@',
        itemCategoryProgress : '@'
    },
    template,
    controller,
    controllerAs : 'checklistItemTotalDuctLeakageTestStrategyController'
};

export default checklistItemTotalDuctLeakageTestStrategyComponent;
