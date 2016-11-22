import template from './toggle.html';
import controller from './toggle.controller';

let toggleComponent = {
    bindings     : {
        toggleValue : '='
    },
    transclude   : true,
    template,
    controller,
    controllerAs : 'toggleCtrl'
};

export default toggleComponent;
