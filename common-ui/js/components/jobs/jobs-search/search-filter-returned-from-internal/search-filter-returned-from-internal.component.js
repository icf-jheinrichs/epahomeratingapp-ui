import template from './search-filter-returned-from-internal.html';
import controller from './search-filter-returned-from-internal.controller';

let searchFilterReturnedFromInternalComponent = {
    bindings : {
        registerFilter : '&'
    },
    template,
    controller,
    controllerAs : 'searchFilterReturnedFromInternalCtrl'
};

export default searchFilterReturnedFromInternalComponent;
