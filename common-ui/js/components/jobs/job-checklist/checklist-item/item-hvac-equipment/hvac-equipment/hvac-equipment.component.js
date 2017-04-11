import template from './hvac-equipment.html';
import controller from './hvac-equipment.controller';

let hvacEquipmentComponent = {
    bindings     : {
        equipment       : '<',
        index           : '@',
        saveEquipment   : '&',
        deleteEquipment : '&'
    },
    template,
    controller,
    controllerAs : 'hvacEquipmentCtrl'
};

export default hvacEquipmentComponent;
