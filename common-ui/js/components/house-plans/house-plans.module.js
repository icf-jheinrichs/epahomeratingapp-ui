import angular from 'angular';

import housePlanComponent from './house-plan/house-plan.component';
import housePlanEditComponent from './house-plan-edit/house-plan-edit.component';
import housePlanNewComponent from './house-plan-new/house-plan-new.component';
import housePlansComponent from './house-plans/house-plans.component';

let housePlansModule
    = angular
        .module('epahomeratingapp.components.housePlans', [])
        .component('housePlan', housePlanComponent)
        .component('housePlanEdit', housePlanEditComponent)
        .component('housePlanNew', housePlanNewComponent)
        .component('housePlans', housePlansComponent);

export default housePlansModule;
