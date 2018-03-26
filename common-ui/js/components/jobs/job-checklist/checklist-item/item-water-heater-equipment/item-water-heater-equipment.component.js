import template from './item-water-heater-equipment.html';
import controller from './item-water-heater-equipment.controller';
// import './job.scss';

let checklistItemWaterHeaterEquipmentComponent = {
    bindings : {
        itemId               : '@',
        itemCategory         : '@',
        itemCategoryProgress : '@'
    },
    template,
    controller,
    controllerAs : 'checklistItemWaterHeaterEquipmentCtrl'
};

export default checklistItemWaterHeaterEquipmentComponent;
