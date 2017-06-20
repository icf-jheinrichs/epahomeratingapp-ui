import ChecklistItemClass from '../checklist-item.class';

class SubItemDefaultController extends ChecklistItemClass {
    $onInit () {
        super.$onInit();
        this.JobChecklistStateService.registerSubItem(this.itemId, this.showItem.bind(this));
        this.show = false;
    }

    showItem (show) {
        this.show = show;
    }
}

export default SubItemDefaultController;
