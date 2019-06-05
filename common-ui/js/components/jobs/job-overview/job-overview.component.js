import template from './job-overview.html';
import controller from './job-overview.controller';
import './job-overview.scss';

let jobOverviewComponent = {
    bindings : {
        job : '<'
    },
    template,
    controller,
    controllerAs : 'jobOverviewCtrl'
};

export default jobOverviewComponent;
