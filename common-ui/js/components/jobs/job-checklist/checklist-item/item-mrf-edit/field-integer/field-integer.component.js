import template from './field-integer.html';
import controller from './field-integer.controller';

let mrfEditFieldIntegerComponent = {
    bindings : {
        field : '<',
        value : '='
    },
    require : {
        model : 'ngModel'
    },
    template,
    controller,
    controllerAs : 'fieldIntegerCtrl'
};

export default mrfEditFieldIntegerComponent;
