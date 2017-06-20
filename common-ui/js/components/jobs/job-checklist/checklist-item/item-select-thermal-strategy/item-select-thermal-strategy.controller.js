import ChecklistItemClass from '../checklist-item.class';

class ChecklistItemSelectThermalStrategyController extends ChecklistItemClass {
    $onInit () {
        super.$onInit();

        this.JobChecklistStateService
            .getChecklistItemOptions(this.itemId)
            .then((options) => {
                this.DROPDOWN_OPTIONS = options;
                this.selectedOption = this.DROPDOWN_OPTIONS[0];
                this.onSelectOption();
            });
    }

    onSelectOption () {
        for (let index in this.DROPDOWN_OPTIONS) {
            if (this.selectedOption === this.DROPDOWN_OPTIONS[index]) {
                this.JobChecklistStateService.showSubItem(this.DROPDOWN_OPTIONS[index].Show, true);
            } else {
                this.JobChecklistStateService.showSubItem(this.DROPDOWN_OPTIONS[index].Show, false);
            }
        }
    }
}

export default ChecklistItemSelectThermalStrategyController;
