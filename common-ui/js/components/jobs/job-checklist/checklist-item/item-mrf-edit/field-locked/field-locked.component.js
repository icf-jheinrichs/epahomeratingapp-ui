import template from './field-locked.html';

let mrfEditFieldLockedComponent = {
    bindings : {
        field : '<',
        value : '=',
        unit  : '<'
    },
    template,
    controllerAs : 'fieldCtrl'
};

export default mrfEditFieldLockedComponent;
