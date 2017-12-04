import template from './search-filter-builder.html';
import controller from './search-filter-builder.controller';

let searchFilterBuilderComponent = {
    bindings : {
        registerFilter : '&'
    },
    template,
    controller,
    controllerAs : 'searchFilterBuilderCtrl'
};

export default searchFilterBuilderComponent;
