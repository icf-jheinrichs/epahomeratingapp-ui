import template from './house-plan-edit.html';
import controller from './house-plan-edit.controller';

let housePlanEditComponent = {
    bindings : {
        housePlan : '<'
    },
    template,
    controller,
    controllerAs : 'housePlanEditCtrl'
};

export default housePlanEditComponent;
