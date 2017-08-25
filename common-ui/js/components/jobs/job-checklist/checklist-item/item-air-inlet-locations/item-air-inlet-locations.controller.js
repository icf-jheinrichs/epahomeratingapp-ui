import ChecklistItemClass from '../checklist-item.class';

class ChecklistItemAirInletLocationsController extends ChecklistItemClass {
    $onInit () {
        super
            .$onInit()
            .then(() => {
                this.itemData       = this.itemData || {selectedOptionIndex : 0};
                this.selectedOption = this.display.Options[this.itemData.selectedOptionIndex];
                this.onSelectOption(false);
            });
    }

    onSelectOption (setItemData) {
        for (let index in this.display.Options) {
            let omitItem = true;

            if (this.selectedOption === this.display.Options[index]) {
                this.itemData.selectedOptionIndex = index;
                omitItem = false;
            }

            this.JobChecklistStateService.omitSubItem(
                setItemData,
                this.display.Options[index].Show,
                {
                    'Category'         : this.itemCategory,
                    'CategoryProgress' : this.itemCategoryProgress,
                },
                omitItem
            );
        }

        if (setItemData) {
            this.setItemData(this.itemData);
        }
    }
}

export default ChecklistItemAirInletLocationsController;
