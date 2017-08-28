import template from './item-mrf-edit-duct-system.html';
import controller from './item-mrf-edit-duct-system.controller';

let checklistItemMrfEditDuctSystemComponent = {
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

export default checklistItemMrfEditDuctSystemComponent;
