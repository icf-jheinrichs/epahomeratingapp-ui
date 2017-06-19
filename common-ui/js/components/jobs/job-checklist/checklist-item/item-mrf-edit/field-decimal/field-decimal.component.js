import template from './field-decimal.html';
import controller from './field-decimal.controller';

let mrfEditFieldDecimalComponent = {
    bindings : {
        decimalName : '@',
        key         : '@',
        label       : '@',
        value       : '='
    },
    template,
    controller,
    controllerAs : 'fieldDecimalCtrl'
};

export default mrfEditFieldDecimalComponent;
