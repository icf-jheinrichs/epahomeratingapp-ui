import template from './house-plans-search-filter-builder.html';
import controller from './house-plans-search-filter-builder.controller';

let searchFilterBuilderComponent = {
    bindings : {
        registerFilter : '&'
    },
    template,
    controller,
    controllerAs : 'searchFilterBuilderCtrl'
};

export default searchFilterBuilderComponent;
