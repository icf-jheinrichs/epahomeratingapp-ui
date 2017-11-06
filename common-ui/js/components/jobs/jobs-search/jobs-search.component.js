import template from './jobs-search.html';
import controller from './jobs-search.controller';

import './jobs-search.scss';

let jobsSearchComponent = {
    bindings : {
        quantity : '<'
    },
    template,
    controller,
    controllerAs : 'jobsSearchCtrl'
};

export default jobsSearchComponent;
