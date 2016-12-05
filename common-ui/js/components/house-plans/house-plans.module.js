import angular from 'angular';

import housePlanComponent from './house-plan/house-plan.component';
import housePlansComponent from './house-plans/house-plans.component';

let housePlansModule
    = angular
        .module('epahomeratingapp.components.housePlans', [])
        .component('housePlan', housePlanComponent)
        .component('housePlans', housePlansComponent);

export default housePlansModule;
