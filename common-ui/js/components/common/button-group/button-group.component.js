import template from './button-group.html';
import controller from './button-group.controller';

let buttonGroupComponent = {
    bindings : {
        buttons       : '<',
        allowMultiple : '<',
        allowNone     : '<',
        initialValue  : '<',
        onSetValue    : '&'
    },
    template,
    controller,
    controllerAs : 'buttonGroupCtrl'
};

export default buttonGroupComponent;
