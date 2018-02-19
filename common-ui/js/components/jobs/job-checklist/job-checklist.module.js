import angular from 'angular';

import checklistNavComponent from './checklist-nav/checklist-nav.component';
import checklistHouseSelectionComponent from './checklist-house-selection/checklist-house-selection.component';
import houseSelectionItemComponent from './checklist-house-selection/house-selection-item/house-selection-item.component';
import checklistCategoryComponent from './checklist-category/checklist-category.component';
import checklistStatusComponent from './checklist-status/checklist-status.component';
import checklistFilterComponent from './checklist-filter/checklist-filter.component';
import checklistItemComponent from './checklist-item/checklist-item.component';
import checklistItemCommentsComponent from './checklist-item/item-comments/item-comments.component';
import checklistItemCommentsReviewComponent from './checklist-item/item-comments-review/item-comments-review.component';
import checklistItemDefaultComponent from './checklist-item/item-default/item-default.component';
import checklistItemResponseComponent from './checklist-item/item-response/item-response.component';

import checklistItemMrfComponent from './checklist-item/item-mrf/item-mrf.component';
import checklistItemMrfEditComponent from './checklist-item/item-mrf-edit/item-mrf-edit.component';
import checklistItemMrfEditDuctSystemComponent from './checklist-item/item-mrf-edit-duct-system/item-mrf-edit-duct-system.component';
import checklistItemMrfEditInfiltrationComponent from './checklist-item/item-mrf-edit-infiltration/item-mrf-edit-infiltration.component';
import checklistItemMrfEditFieldBooleanComponent from './checklist-item/item-mrf-edit/field-boolean/field-boolean.component';
import checklistItemMrfEditFieldDecimalComponent from './checklist-item/item-mrf-edit/field-decimal/field-decimal.component';
import checklistItemMrfEditFieldDefaultComponent from './checklist-item/item-mrf-edit/field-default/field-default.component';
import checklistItemMrfEditFieldEnumComponent from './checklist-item/item-mrf-edit/field-enum/field-enum.component';
import checklistItemMrfEditFieldIntegerComponent from './checklist-item/item-mrf-edit/field-integer/field-integer.component';
import checklistItemMrfEditFieldLockedComponent from './checklist-item/item-mrf-edit/field-locked/field-locked.component';
import checklistItemMrfEditFieldStringComponent from './checklist-item/item-mrf-edit/field-string/field-string.component';

import checklistItemNotApplicableComponent from './checklist-item/item-not-applicable/item-not-applicable.component';
import checklistItemStaticPressureComponent from './checklist-item/item-static-pressure/item-static-pressure.component';
import checklistItemHvacCommissioningComponent from './checklist-item/item-hvac-commissioning/item-hvac-commissioning.component';
import checklistItemHvacEquipmentComponent from './checklist-item/item-hvac-equipment/item-hvac-equipment.component';
import hvacEquipmentComponent from './checklist-item/item-hvac-equipment/hvac-equipment/hvac-equipment.component';
import checklistItemMeasuredVentilationComponent from './checklist-item/item-measured-ventilation/item-measured-ventilation.component';
import checklistItemAirInletLocationsComponent from './checklist-item/item-air-inlet-locations/item-air-inlet-locations.component';
import checklistItemSelectThermalStrategyComponent from './checklist-item/item-select-thermal-strategy/item-select-thermal-strategy.component';
import checklistItemTotalDuctLeakageTestStrategyComponent from './checklist-item/item-total-duct-leakage-test-strategy/item-total-duct-leakage-test-strategy.component';
import subItemDefaultComponent from './checklist-item/sub-item-default/sub-item-default.component';

let jobsModule
    = angular
        .module('epahomeratingapp.components.jobs.checklist', [])
        .component('checklistNav', checklistNavComponent)
        .component('checklistHouseSelection', checklistHouseSelectionComponent)
        .component('houseSelectionItem', houseSelectionItemComponent)
        .component('checklistCategory', checklistCategoryComponent)
        .component('checklistStatus', checklistStatusComponent)
        .component('checklistFilter', checklistFilterComponent)
        .component('checklistItem', checklistItemComponent)
        .component('checklistItemComments', checklistItemCommentsComponent)
        .component('checklistItemCommentsReview', checklistItemCommentsReviewComponent)
        .component('checklistItemDefault', checklistItemDefaultComponent)
        .component('checklistItemResponse', checklistItemResponseComponent)
        .component('checklistItemMrf', checklistItemMrfComponent)
        .component('mrfEdit', checklistItemMrfEditComponent)
        .component('mrfEditDuctSystem', checklistItemMrfEditDuctSystemComponent)
        .component('mrfEditInfiltration', checklistItemMrfEditInfiltrationComponent)
        .component('mrfEditFieldBoolean', checklistItemMrfEditFieldBooleanComponent)
        .component('mrfEditFieldDecimal', checklistItemMrfEditFieldDecimalComponent)
        .component('mrfEditFieldDefault', checklistItemMrfEditFieldDefaultComponent)
        .component('mrfEditFieldEnum', checklistItemMrfEditFieldEnumComponent)
        .component('mrfEditFieldInteger', checklistItemMrfEditFieldIntegerComponent)
        .component('mrfEditFieldLocked', checklistItemMrfEditFieldLockedComponent)
        .component('mrfEditFieldString', checklistItemMrfEditFieldStringComponent)
        .component('checklistItemNotApplicable', checklistItemNotApplicableComponent)
        .component('checklistItemStaticPressure', checklistItemStaticPressureComponent)
        .component('checklistItemHvacCommissioning', checklistItemHvacCommissioningComponent)
        .component('checklistItemHvacEquipment', checklistItemHvacEquipmentComponent)
        .component('hvacEquipment', hvacEquipmentComponent)
        .component('checklistItemMeasuredVentilation', checklistItemMeasuredVentilationComponent)
        .component('checklistItemAirInletLocations', checklistItemAirInletLocationsComponent)
        .component('checklistItemSelectThermalStrategy', checklistItemSelectThermalStrategyComponent)
        .component('checklistItemTotalDuctLeakageTestStrategy', checklistItemTotalDuctLeakageTestStrategyComponent)
        .component('subItemDefault', subItemDefaultComponent);

export default jobsModule;
