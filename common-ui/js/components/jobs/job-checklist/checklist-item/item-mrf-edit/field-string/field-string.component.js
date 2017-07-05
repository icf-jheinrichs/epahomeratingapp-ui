import template from './field-string.html';
import controller from './field-string.controller';

let mrfEditFieldStringComponent = {
    bindings : {
        stringName : '@',
        key         : '@',
        label       : '@',
        value       : '='
    },
    template,
    controller,
    controllerAs : 'fieldStringCtrl'
};

export default mrfEditFieldStringComponent;
