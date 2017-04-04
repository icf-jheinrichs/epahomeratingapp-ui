import ChecklistItemClass from '../checklist-item.class';

class ChecklistItemHVACCommissioningController extends ChecklistItemClass {
    $onInit () {
        super.$onInit();
    }

    onViewHvacDesignReport () {
        this.$rootScope.$emit(this.MESSAGING.VIEW_HVAC_DESIGN_REPORT);
    }
}

export default ChecklistItemHVACCommissioningController;
