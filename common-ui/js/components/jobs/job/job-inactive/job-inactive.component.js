import template from './job-inactive.html';
import controller from './job-inactive.controller';

let jobInactiveComponent = {
    bindings : {
        enabled                  : '<',
        job                      : '<',
        marked                   : '=',
        onSetBulkOperationStatus : '&'
    },
    template,
    controller,
    controllerAs : 'jobInactiveCtrl'
};

export default jobInactiveComponent;
