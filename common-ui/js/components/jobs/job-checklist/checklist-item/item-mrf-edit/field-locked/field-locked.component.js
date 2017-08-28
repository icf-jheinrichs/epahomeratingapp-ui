import template from './field-locked.html';

let mrfEditFieldLockedComponent = {
    bindings : {
        field : '<',
        value : '='
    },
    template,
    controllerAs : 'fieldCtrl'
};

export default mrfEditFieldLockedComponent;
