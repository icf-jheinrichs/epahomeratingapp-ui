import template from './item-mrf-edit.html';
import controller from './item-mrf-edit.controller';

let checklistItemMrfEditComponent = {
    bindings : {
        focus              : '@',
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

export default checklistItemMrfEditComponent;
