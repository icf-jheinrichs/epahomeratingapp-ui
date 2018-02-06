import housePlansSearchComponent from './house-plans-search.component';
import housePlansSearchFilterBuilderComponent from './house-plans-search-filter-builder/house-plans-search-filter-builder.component';
import housePlansSearchFilterHousePlanComponent from './house-plans-search-filter-house-plan/house-plans-search-filter-house-plan.component';

let housePlansSearchModule
    = angular
        .module('epahomeratingapp.components.housePlans.search', [])
        .component('housePlansSearch', housePlansSearchComponent)
        .component('housePlansSearchFilterBuilder', housePlansSearchFilterBuilderComponent)
        .component('housePlansSearchFilterHousePlan', housePlansSearchFilterHousePlanComponent);

export default housePlansSearchModule;
