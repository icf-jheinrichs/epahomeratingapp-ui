import template from './field-decimal.html';
import controller from './field-decimal.controller';

let mrfEditFieldDecimalComponent = {
    bindings : {
        disabled           : '<',
        field              : '<',
        focus              : '@',
        value              : '=',
        handleChange       : '&',
        unit               : '<',
        customErrorMessage : '<'
    },
    require : {
        model : 'ngModel'
    },
    template,
    controller,
    controllerAs : 'fieldDecimalCtrl'
};

export default mrfEditFieldDecimalComponent;
