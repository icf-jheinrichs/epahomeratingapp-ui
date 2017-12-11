import template from './job-rater.html';
import controller from './job-rater.controller';
import './job-rater.scss';

let jobRaterComponent = {
    bindings : {
        job    : '<'
    },
    template,
    controller,
    controllerAs : 'jobRaterCtrl'
};

export default jobRaterComponent;
