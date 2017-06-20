import template from './checklist-stage.html';
import controller from './checklist-stage.controller';

let jobChecklistStageComponent = {
    bindings : {
        jobDisplayList    : '<',
        jobChecklistState : '<',
        jobDataResponse   : '<'
    },
    template,
    controller,
    controllerAs : 'jobChecklistStageCtrl'
};

export default jobChecklistStageComponent;
