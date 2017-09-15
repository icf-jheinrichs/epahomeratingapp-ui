import template from './field-default.html';
import controller from './field-default.controller';

let mrfEditFieldComponent = {
    bindings : {
        field        : '<',
        value        : '=',
        handleChange : '&'
    },
    template,
    controller,
    controllerAs : 'fieldCtrl'
};

export default mrfEditFieldComponent;
