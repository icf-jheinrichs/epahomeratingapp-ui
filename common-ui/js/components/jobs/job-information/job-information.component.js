import template from './job-information.html';
import controller from './job-information.controller';
import './job-information.scss';

let jobInformationComponent = {
    bindings : {
        job : '<'
    },
    template,
    controller,
    controllerAs : 'jobInformationCtrl'
};

export default jobInformationComponent;
