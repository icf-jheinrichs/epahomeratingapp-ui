import template from './file-manager.html';
import controller from './file-manager.controller';

let fileManagerComponent = {
    bindings : {
        files : '='
    },
    template,
    controller,
    controllerAs : 'fileManagerCtrl'
};

export default fileManagerComponent;
