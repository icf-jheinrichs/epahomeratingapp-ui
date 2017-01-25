import template from './job-detail.html';
import controller from './job-detail.controller';
import './job-detail.scss';

let jobDetailComponent = {
    bindings : {
        submitLabel : '@',
        submitJob   : '&',
        job         : '<',
        housePlans  : '<'
    },
    template,
    controller,
    controllerAs : 'jobDetailCtrl'
};

export default jobDetailComponent;
