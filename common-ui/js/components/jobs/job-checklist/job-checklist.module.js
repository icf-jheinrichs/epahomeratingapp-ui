import angular from 'angular';

import checklistNavComponent from './checklist-nav/checklist-nav.component';
import checklistHouseSelectionComponent from './checklist-house-selection/checklist-house-selection.component';
import houseSelectionItemComponent from './checklist-house-selection/house-selection-item/house-selection-item.component';
import checklistCategoryComponent from './checklist-category/checklist-category.component';
import checklistFilterComponent from './checklist-filter/checklist-filter.component';
import checklistItemComponent from './checklist-item/checklist-item.component';
import checklistItemDefaultComponent from './checklist-item/item-default/item-default.component';
import checklistItemMrfComponent from './checklist-item/item-mrf/item-mrf.component';

let jobsModule
    = angular
        .module('epahomeratingapp.components.jobs.checklist', [])
        .component('checklistNav', checklistNavComponent)
        .component('checklistHouseSelection', checklistHouseSelectionComponent)
        .component('houseSelectionItem', houseSelectionItemComponent)
        .component('checklistCategory', checklistCategoryComponent)
        .component('checklistFilter', checklistFilterComponent)
        .component('checklistItem', checklistItemComponent)
        .component('checklistItemDefault', checklistItemDefaultComponent)
        .component('checklistItemMrf', checklistItemMrfComponent);

export default jobsModule;
