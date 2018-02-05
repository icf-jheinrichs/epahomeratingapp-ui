import template from './search-filter-job-type.html';
import controller from './search-filter-job-type.controller';

let searchFilterJobTypeComponent = {
    bindings : {
        registerFilter : '&'
    },
    template,
    controller,
    controllerAs : 'searchFilterJobTypeCtrl'
};

export default searchFilterJobTypeComponent;
