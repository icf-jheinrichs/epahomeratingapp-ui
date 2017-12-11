import template from './jobs-provider-page.html';
import controller from './jobs-provider-page.controller';

import './jobs-provider-page.scss';

let jobsProviderPageComponent = {
    bindings : {
        jobs    : '<',
        company : '<'
    },
    template,
    controller,
    controllerAs : 'jobsProviderPageCtrl'
};

export default jobsProviderPageComponent;
