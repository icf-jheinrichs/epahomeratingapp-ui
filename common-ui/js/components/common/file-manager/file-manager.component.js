import template from './file-manager.html';
import controller from './file-manager.controller';

let fileManagerComponent = {
    bindings : {
        accept                  : '@',
        label                   : '@',
        uploadOnly              : '@',
        enabled                 : '=',
        inputId                 : '@',
        files                   : '=',
        showDetails             : '<',
        library                 : '<',
        librarySelectedCallback : '&',
        localSelectedCallback   : '&'
    },
    template,
    controller,
    controllerAs : 'fileManagerCtrl'
};

export default fileManagerComponent;
