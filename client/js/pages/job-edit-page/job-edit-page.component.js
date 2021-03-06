import template from './job-edit-page.html';
import controller from './job-edit-page.controller';

let jobsEditPageComponent = {
    bindings : {
        job        : '<',
        housePlans : '<'
    },
    template,
    controller,
    controllerAs : 'jobsEditPageCtrl'
};

export default jobsEditPageComponent;
