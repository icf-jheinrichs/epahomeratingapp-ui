import template from './item-hvac-equipment.html';
import controller from './item-hvac-equipment.controller';
// import './job.scss';

let checklistItemHVACEquipmentComponent = {
    bindings : {
        itemId               : '@',
        itemCategory         : '@',
        itemCategoryProgress : '@'
    },
    template,
    controller,
    controllerAs : 'checklistItemHVACEquipmentCtrl'
};

export default checklistItemHVACEquipmentComponent;
