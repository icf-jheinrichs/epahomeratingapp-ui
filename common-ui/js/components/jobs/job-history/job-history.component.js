import template from './job-history.html';
import controller from './job-history.controller';
import './job-history.scss';

let jobHistoryComponent = {
    bindings : {
        jobHistory : '<'
    },
    template,
    controller,
    controllerAs : 'jobHistoryCtrl'
};

export default jobHistoryComponent;
