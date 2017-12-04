import template from './search-filter-house-plan.html';
import controller from './search-filter-house-plan.controller';

let searchFilterHousePlanComponent = {
    bindings : {
        registerFilter : '&',
        onShowSubPanel : '&'
    },
    template,
    controller,
    controllerAs : 'searchFilterHousePlanCtrl'
};

export default searchFilterHousePlanComponent;
