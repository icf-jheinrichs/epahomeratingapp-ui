import template from './jobs.html';
import controller from './jobs.controller';
import './jobs.scss';

let jobsComponent = {
    bindings : {
        jobs : '<'
    },
    template,
    controller,
    controllerAs : 'jobsCtrl'
};

export default jobsComponent;
