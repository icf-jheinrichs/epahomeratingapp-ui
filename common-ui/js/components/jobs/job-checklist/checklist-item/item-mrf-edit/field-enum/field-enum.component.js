import template from './field-enum.html';
import controller from './field-enum.controller';

let mrfEditFieldEnumComponent = {
    bindings : {
        field : '<',
        value : '='
    },
    template,
    controller,
    controllerAs : 'fieldEnumCtrl'
};

export default mrfEditFieldEnumComponent;
