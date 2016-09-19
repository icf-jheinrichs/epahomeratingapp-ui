import angular from 'angular';
import checklistItemComponent from './checklist-item/checklist-item.component';
import checklistItemDefaultComponent from './checklist-item/item-default/item-default.component';
import checklistItemMrfComponent from './checklist-item/item-mrf/item-mrf.component';

let jobsModule
    = angular
        .module('epahomeratingapp.components.jobs.checklist', [])
        .component('checklistItem', checklistItemComponent)
        .component('checklistItemDefault', checklistItemDefaultComponent)
        .component('checklistItemMrf', checklistItemMrfComponent);

export default jobsModule;
