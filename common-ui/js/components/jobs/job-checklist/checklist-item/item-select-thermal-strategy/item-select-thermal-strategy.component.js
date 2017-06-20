import template from './item-select-thermal-strategy.html';
import controller from './item-select-thermal-strategy.controller';
// import './job.scss';

let checklistItemSelectThermalStrategyComponent = {
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
    controllerAs : 'checklistItemSelectThermalStrategyController'
};

export default checklistItemSelectThermalStrategyComponent;
