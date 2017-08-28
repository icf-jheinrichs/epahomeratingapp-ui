import template from './item-mrf-edit-infiltration.html';
import controller from './item-mrf-edit-infiltration.controller';

let checklistItemMrfEditInfiltrationComponent = {
    bindings : {
        mrfDigest          : '<',
        mrfData            : '<',
        title              : '@',
        onSaveMrfRow       : '&',
        onCancelMrfRow     : '&',
        libraryTypeNameKey : '@'
    },
    template,
    controller,
    controllerAs : 'checklistItemMrfEditCtrl'
};

export default checklistItemMrfEditInfiltrationComponent;
