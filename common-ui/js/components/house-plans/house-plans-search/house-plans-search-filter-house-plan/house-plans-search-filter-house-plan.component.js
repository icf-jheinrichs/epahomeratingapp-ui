import template from './house-plans-search-filter-house-plan.html';
import controller from './house-plans-search-filter-house-plan.controller';

let housePlansSearchFilterHousePlanComponent = {
    bindings : {
        registerFilter : '&'
    },
    template,
    controller,
    controllerAs : 'housePlansSearchFilterHousePlanCtrl'
};

export default housePlansSearchFilterHousePlanComponent;
