class ChecklistItemController {
    constructor ($stateParams, DisplayLogicDigestService, JobChecklistStateService, UI_ENUMS) {
        'ngInject';

        this.$stateParams = $stateParams;

        this.DisplayLogicDigestService = DisplayLogicDigestService;
        this.JobChecklistStateService  = JobChecklistStateService;

        this.jobRatingType = this.JobChecklistStateService.getJob().RatingType;
        this.RATING_TYPES  = UI_ENUMS.RATING_TYPES;
        this.isOmitted     = false;
    }

    $onInit () {
        let currentHousePlanId = this.JobChecklistStateService.currentHouse.HousePlan[0]._id;
        let filterStatus       = this.$stateParams.status || '';

        this
            .DisplayLogicDigestService
            .get(this.itemId)
            .then(checklistItem => {
                this.checklistItem = checklistItem;

                return this.JobChecklistStateService.getChecklistItemResponse(this.itemId, this.itemCategory, this.itemCategoryProgress);
            })
            .then(response => {
                this.isFiltered = false;

                this.response = response.Response;

                if (filterStatus === 'Any') {
                    this.isFiltered = false;
                } else if (filterStatus === 'to-do') {
                    this.isFiltered = this.response !== undefined;
                } else if (filterStatus === 'must-correct') {
                    this.isFiltered = this.response === undefined || this.response[0] !== 'MustCorrect';
                } else {
                    this.isFiltered = false;
                }

                if (this.jobRatingType === this.RATING_TYPES.HERS.Key && this.checklistItem.RatingType === this.RATING_TYPES.EnergyStar.Key) {
                    this.isOmitted = true;
                }

                this
                    .JobChecklistStateService
                    .registerItemStatusQuery(`${this.itemCategory}:${this.itemCategoryProgress}:${this.itemId}`, this.statusQuery.bind(this));

                if (this.checklistItem.Type === 'SubItem-Default') {
                    this.isOmitted = true;

                    this
                        .JobChecklistStateService
                        .registerSubItem(this.itemId, this.omitItem.bind(this));
                }
            });

        this.housePlanIds = this.JobChecklistStateService.getChecklistItemHouseplanIds(this.itemId, this.itemCategory, this.itemCategoryProgress);
        this.isApplicable = this.housePlanIds.indexOf(currentHousePlanId) >= 0;
    }

    omitItem (isOmitted) {
        this.isOmitted = isOmitted;
    }

    statusQuery () {
        return {
            isApplicable : this.isApplicable,
            isFiltered   : this.isFiltered,
            isOmitted    : this.isOmitted || this.checklistItem.Options !== undefined
        };
    }
}

export default ChecklistItemController;
