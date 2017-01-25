import template from './toggle.html';

let toggleComponent = {
    bindings     : {
        toggleValue : '='
    },
    transclude   : true,
    template,
    controllerAs : 'toggleCtrl'
};

export default toggleComponent;
