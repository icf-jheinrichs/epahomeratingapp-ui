import template from './job-checklist-page.html';
import controller from './job-checklist-page.controller';

let jobsChecklistPageComponent = {
    bindings : {
        job             : '<'
    },
    template,
    controller,
    controllerAs : 'jobsChecklistPageCtrl'
};

export default jobsChecklistPageComponent;
