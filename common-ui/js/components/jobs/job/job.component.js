import template from './job.html';
import controller from './job.controller';
import './job.scss';

let jobComponent = {
    bindings : {
        job    : '<',
        marked : '='
    },
    template,
    controller,
    controllerAs : 'jobCtrl'
};

export default jobComponent;
