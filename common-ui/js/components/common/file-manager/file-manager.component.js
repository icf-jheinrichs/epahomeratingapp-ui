import template from './file-manager.html';
import controller from './file-manager.controller';

let fileManagerComponent = {
    bindings : {
        label      : '@',
        uploadOnly : '@',
        files      : '=',
        library    : '<'
    },
    template,
    controller,
    controllerAs : 'fileManagerCtrl'
};

export default fileManagerComponent;
