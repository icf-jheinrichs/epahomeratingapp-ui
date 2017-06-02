class ChecklistItemController {
    constructor (DisplayLogicDigestService, JobChecklistStateService) {
        'ngInject';

        this.DisplayLogicDigestService = DisplayLogicDigestService;
        this.JobChecklistStateService  = JobChecklistStateService;
    }

    $onInit () {
        let currentHousePlanId = this.JobChecklistStateService.currentHouse.HousePlan[0]._id;
        this
            .DisplayLogicDigestService
            .get(this.itemId)
            .then(checklistItem => {
                this.checklistItem = checklistItem;
            });

        this.housePlanIds = this.JobChecklistStateService.getChecklistItemHouseplanIds(this.itemId, this.itemCategory, this.itemCategoryProgress);
        this.isApplicable = this.housePlanIds.indexOf(currentHousePlanId) >= 0;
    }
}

export default ChecklistItemController;
