import template from './checklist-progress.html';
import controller from './checklist-progress.controller';

let jobChecklistProgressComponent = {
    bindings : {
        jobDisplayList    : '<',
        jobChecklistState : '<',
        jobDataResponse   : '<'
    },
    template,
    controller,
    controllerAs : 'jobChecklistProgressCtrl'
};

export default jobChecklistProgressComponent;
