class ChecklistItemController {
    constructor ($stateParams, DisplayLogicDigestService, JobChecklistStateService, UI_ENUMS) {
        'ngInject';

        this.$stateParams = $stateParams;

        this.DisplayLogicDigestService = DisplayLogicDigestService;
        this.JobChecklistStateService  = JobChecklistStateService;

        this.jobRatingType = this.JobChecklistStateService.getJob().RatingType;
        this.RATING_TYPES  = UI_ENUMS.RATING_TYPES;
    }

    $onInit () {
        let currentHousePlanId = this.JobChecklistStateService.currentHouse.HousePlan[0]._id;
        let filterStatus       = this.$stateParams.status || '';
        this
            .DisplayLogicDigestService
            .get(this.itemId)
            .then(checklistItem => {
                this.checklistItem = checklistItem;

                this.hide = false;

                if (filterStatus === 'Any') {
                    this.hide = false;
                } else if (filterStatus === 'to-do') {
                    this.hide = this.response !== undefined;
                } else if (filterStatus === 'must-correct') {
                    this.hide = this.response === undefined || this.response[0] !== 'MustCorrect';
                } else {
                    this.hide = false;
                }

                if (this.jobRatingType === this.RATING_TYPES.HERS.Key && this.checklistItem.RatingType === this.RATING_TYPES.EnergyStar.Key) {
                    this.hide = true;
                }

            });

        this.housePlanIds = this.JobChecklistStateService.getChecklistItemHouseplanIds(this.itemId, this.itemCategory, this.itemCategoryProgress);
        this.isApplicable = this.housePlanIds.indexOf(currentHousePlanId) >= 0;

    }
}

export default ChecklistItemController;
