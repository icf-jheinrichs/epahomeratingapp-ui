import template from './field-integer.html';
import controller from './field-integer.controller';

let mrfEditFieldIntegerComponent = {
    bindings : {
        integerName : '@',
        key         : '@',
        label       : '@',
        value       : '='
    },
    require : {
        model : 'ngModel'
    },
    template,
    controller,
    controllerAs : 'fieldIntegerCtrl'
};

export default mrfEditFieldIntegerComponent;
