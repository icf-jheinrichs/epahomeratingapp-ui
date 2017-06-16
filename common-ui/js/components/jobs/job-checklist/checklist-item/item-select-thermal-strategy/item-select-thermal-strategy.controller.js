import ChecklistItemClass from '../checklist-item.class';

class ChecklistItemSelectThermalStrategyController extends ChecklistItemClass {
    $onInit () {
        super.$onInit();

        this.DROPDOWN_OPTIONS = this.JobChecklistStateService.getChecklistItemOptions(this.itemId);
        this.selectedOption = this.DROPDOWN_OPTIONS[0];
    }
}

export default ChecklistItemSelectThermalStrategyController;
