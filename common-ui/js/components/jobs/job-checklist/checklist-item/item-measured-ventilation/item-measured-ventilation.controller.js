import ChecklistItemClass from '../checklist-item.class';

class ChecklistItemMrfController extends ChecklistItemClass {
    $onInit () {
        super
            .$onInit()
            .then(() => {
                this.house = this.JobChecklistStateService.getCurrentHouse();
            });
    }

    onViewHvacDesignReport () {
        this.$rootScope.$emit(this.MESSAGING.VIEW_HVAC_DESIGN_REPORT);
    }

    get hasHVACDesignReport () {
        const hvacDesignReportLength = (this.house) ? this.house.HvacDesignReport.length : 0;

        return hvacDesignReportLength > 0;
    }
}

export default ChecklistItemMrfController;
