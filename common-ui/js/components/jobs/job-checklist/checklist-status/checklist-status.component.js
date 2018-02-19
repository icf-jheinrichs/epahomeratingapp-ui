import template from './checklist-status.html';
import controller from './checklist-status.controller';

let jobChecklistStatusComponent = {
    bindings : {
        jobDisplayList    : '<',
        jobChecklistState : '<',
        jobDataResponse   : '<'
    },
    template,
    controller,
    controllerAs : 'jobChecklistStatusCtrl'
};

export default jobChecklistStatusComponent;
