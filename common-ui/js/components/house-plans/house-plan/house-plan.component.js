import template from './house-plan.html';
import controller from './house-plan.controller';

import './house-plan.scss';

let housePlanComponent = {
    bindings : {
        housePlan : '<'
    },
    template,
    controller,
    controllerAs : 'housePlanCtrl'
};

export default housePlanComponent;
