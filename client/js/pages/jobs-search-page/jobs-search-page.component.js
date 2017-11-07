import template from './jobs-search-page.html';
import controller from './jobs-search-page.controller';

let jobsSearchPageComponent = {
    bindings : {
        jobs : '<'
    },
    template,
    controller,
    controllerAs : 'jobsSearchPageCtrl'
};

export default jobsSearchPageComponent;
