import template from './job-checklist.html';
import controller from './job-checklist.controller';
import './job-checklist.scss';

let jobChecklistComponent = {
    bindings : {
        job : '<'
    },
    template,
    controller,
    controllerAs : 'jobChecklistCtrl'
};

export default jobChecklistComponent;
