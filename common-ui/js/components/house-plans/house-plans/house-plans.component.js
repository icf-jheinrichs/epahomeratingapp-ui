import template from './house-plans.html';
import controller from './house-plans.controller';

let housePlansComponent = {
    bindings : {
        housePlans : '<'
    },
    template,
    controller,
    controllerAs : 'housePlansCtrl'
};

export default housePlansComponent;
