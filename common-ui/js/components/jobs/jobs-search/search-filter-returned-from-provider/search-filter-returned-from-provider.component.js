import template from './search-filter-returned-from-provider.html';
import controller from './search-filter-returned-from-provider.controller';

let searchFilterReturnedFromProviderComponent = {
    bindings : {
        registerFilter : '&'
    },
    template,
    controller,
    controllerAs : 'searchFilterReturnedFromProviderCtrl'
};

export default searchFilterReturnedFromProviderComponent;
