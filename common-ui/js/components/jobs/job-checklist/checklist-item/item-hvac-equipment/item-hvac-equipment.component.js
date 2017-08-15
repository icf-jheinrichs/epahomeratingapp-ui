import template from './item-hvac-equipment.html';
import controller from './item-hvac-equipment.controller';
// import './job.scss';

let checklistItemHVACCommissioningComponent = {
    bindings : {
        itemId               : '@',
        itemCategory         : '@',
        itemCategoryProgress : '@'
    },
    template,
    controller,
    controllerAs : 'checklistItemHVACCommissioningCtrl'
};

export default checklistItemHVACCommissioningComponent;
