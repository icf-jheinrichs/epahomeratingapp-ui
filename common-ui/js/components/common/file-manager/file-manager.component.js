import template from './file-manager.html';
import controller from './file-manager.controller';

let fileManagerComponent = {
    bindings : {
        accept           : '@',
        label            : '@',
        uploadOnly       : '@',
        enabled          : '=',
        inputId          : '@',
        files            : '=',
        library          : '<',
        selectedCallback : '&'
    },
    template,
    controller,
    controllerAs : 'fileManagerCtrl'
};

export default fileManagerComponent;
