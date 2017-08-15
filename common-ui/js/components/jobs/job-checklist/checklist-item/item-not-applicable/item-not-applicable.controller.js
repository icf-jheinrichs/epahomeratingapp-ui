import ChecklistItemClass from '../checklist-item.class';

class ChecklistItemDefaultController extends ChecklistItemClass {
    $onInit () {
        super
            .$onInit()
            .then(() => {
                this.applicableHouses  = this.JobChecklistStateService.getApplicableHouses(this.housePlanIds);
            });
    }
}

export default ChecklistItemDefaultController;
