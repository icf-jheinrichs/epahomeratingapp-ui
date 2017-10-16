import template from './house-plan-edit-bulk.html';
import controller from './house-plan-edit-bulk.controller';

let housePlanEditBulkComponent = {
    bindings : {
        housePlanIDs : '<'
    },
    template,
    controller,
    controllerAs : 'housePlanEditBulkCtrl'
};

export default housePlanEditBulkComponent;
