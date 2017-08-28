import template from './field-default.html';

let mrfEditFieldComponent = {
    bindings : {
        field : '<',
        value : '='
    },
    template,
    controllerAs : 'fieldCtrl'
};

export default mrfEditFieldComponent;
