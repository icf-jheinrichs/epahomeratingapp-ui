import template from './field-boolean.html';
import controller from './field-boolean.controller';

let mrfEditFieldBooleanComponent = {
    bindings : {
        label : '@',
        value : '='
    },
    template,
    controller,
    controllerAs : 'fieldBooleanCtrl'
};

export default mrfEditFieldBooleanComponent;
