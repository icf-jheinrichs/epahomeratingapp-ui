import ChecklistItemClass from '../checklist-item.class';

class SubItemDefaultController extends ChecklistItemClass {
    $onInit () {
        super.$onInit();
    }

    $onChanges (changes) {
        if (!changes.isOmitted.isFirstChange() && changes.isOmitted.currentValue) {
            this.response = [];
        }
    }
}

export default SubItemDefaultController;
