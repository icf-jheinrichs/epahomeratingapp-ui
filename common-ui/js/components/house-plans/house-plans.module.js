import angular from 'angular';

import housePlanComponent from './house-plan/house-plan.component';
import housePlanEditComponent from './house-plan-edit/house-plan-edit.component';
import housePlanEditBulkComponent from './house-plan-edit-bulk/house-plan-edit-bulk.component';
import housePlanNewComponent from './house-plan-new/house-plan-new.component';
import housePlansComponent from './house-plans/house-plans.component';
import HousePlansSearchModule from './house-plans-search/house-plans-search.module';

let housePlansModule
    = angular
        .module('epahomeratingapp.components.housePlans', [
            HousePlansSearchModule.name
        ])
        .component('housePlan', housePlanComponent)
        .component('housePlanEdit', housePlanEditComponent)
        .component('housePlanEditBulk', housePlanEditBulkComponent)
        .component('housePlanNew', housePlanNewComponent)
        .component('housePlans', housePlansComponent);

export default housePlansModule;
