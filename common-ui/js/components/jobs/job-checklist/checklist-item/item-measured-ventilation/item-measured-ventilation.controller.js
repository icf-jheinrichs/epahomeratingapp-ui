import ChecklistItemClass from '../checklist-item.class';

class ChecklistItemMrfController extends ChecklistItemClass {
    $onInit () {
        super.$onInit();
    }

    onViewHvacDesignReport () {
        this.$rootScope.$emit(this.MESSAGING.VIEW_HVAC_DESIGN_REPORT);
    }
}

export default ChecklistItemMrfController;
