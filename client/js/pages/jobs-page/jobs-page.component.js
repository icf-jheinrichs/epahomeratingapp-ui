import template from './jobs-page.html';
import controller from './jobs-page.controller';

let jobsPageComponent = {
    bindings : {
        jobs : '<'
    },
    template,
    controller,
    controllerAs : 'jobsPageCtrl'
};

export default jobsPageComponent;
