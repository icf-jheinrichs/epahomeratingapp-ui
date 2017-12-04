import template from './job-provider.html';
import controller from './job-provider.controller';
import './job-provider.scss';

let jobProviderComponent = {
    bindings : {
        job    : '<',
        marked : '='
    },
    template,
    controller,
    controllerAs : 'jobProviderCtrl'
};

export default jobProviderComponent;
