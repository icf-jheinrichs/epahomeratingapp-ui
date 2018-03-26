import template from './water-heater-equipment.html';
import controller from './water-heater-equipment.controller';

let waterHeaterEquipmentComponent = {
    bindings     : {
        equipment       : '<',
        index           : '@',
        showActions     : '@',
        deleteEquipment : '&'
    },
    template,
    controller,
    controllerAs : 'waterHeaterEquipmentCtrl'
};

export default waterHeaterEquipmentComponent;
