import ChecklistItemClass from '../checklist-item.class';

class ChecklistItemAirInletLocationsController extends ChecklistItemClass {
    $onInit () {
        super.$onInit();

        this.JobChecklistStateService
            .getChecklistItemOptions(this.itemId)
            .then((options) => {
                this.DROPDOWN_OPTIONS = options;
                this.itemData = this.itemData || {selectedOptionIndex : 0};
                this.selectedOption = this.DROPDOWN_OPTIONS[this.itemData.selectedOptionIndex];
                this.onSelectOption();
            });
    }

    onSelectOption () {
        for (let index in this.DROPDOWN_OPTIONS) {
            if (this.selectedOption === this.DROPDOWN_OPTIONS[index]) {
                this.JobChecklistStateService.showSubItem(this.DROPDOWN_OPTIONS[index].Show, true);
                this.itemData.selectedOptionIndex = index;
                this.setItemData(this.itemData);
            } else {
                this.JobChecklistStateService.showSubItem(this.DROPDOWN_OPTIONS[index].Show, false);
            }
        }
    }
}

export default ChecklistItemAirInletLocationsController;
