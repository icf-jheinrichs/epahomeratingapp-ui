import ChecklistItemClass from '../checklist-item.class';

class ChecklistItemSelectThermalStrategyController extends ChecklistItemClass {
    $onInit () {
        super
            .$onInit()
            .then(() => {
                this.JobChecklistStateService
                    .getChecklistItemOptions(this.itemId)
                    .then((options) => {
                        this.DROPDOWN_OPTIONS = options;
                        this.itemData         = this.itemData || {selectedOptionIndex : 0};
                        this.selectedOption   = this.DROPDOWN_OPTIONS[this.itemData.selectedOptionIndex];
                        this.onSelectOption();
                    });
            });
    }

    onSelectOption () {
        for (let index in this.DROPDOWN_OPTIONS) {
            if (this.selectedOption === this.DROPDOWN_OPTIONS[index]) {
                this.JobChecklistStateService.omitSubItem(this.DROPDOWN_OPTIONS[index].Show, false);
                this.itemData.selectedOptionIndex = index;
                this.setItemData(this.itemData);
            } else {
                this.JobChecklistStateService.omitSubItem(this.DROPDOWN_OPTIONS[index].Show, true);
            }
        }
    }
}

export default ChecklistItemSelectThermalStrategyController;
