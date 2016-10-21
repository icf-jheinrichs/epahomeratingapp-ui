import template from './item-mrf-edit.html';
import controller from './item-mrf-edit.controller';

let checklistItemMrfEditComponent = {
    bindings : {
        mrfDigest      : '<',
        mrfData        : '<',
        title          : '@',
        onSaveMrfRow   : '&',
        onCancelMrfRow : '&'
    },
    template,
    controller,
    controllerAs : 'checklistItemMrfEditCtrl'
};

export default checklistItemMrfEditComponent;
