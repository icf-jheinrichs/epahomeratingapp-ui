import _findKey from 'lodash/findKey';

class ChecklistFilterController {
    constructor ($state, $stateParams, JobChecklistStateService, UI_ENUMS) {
        'ngInject';

        this.$state       = $state;
        this.$stateParams = $stateParams;
        this.STATE_NAME   = UI_ENUMS.STATE_NAME;

        this.JobChecklistStateService = JobChecklistStateService;
        this.CATEGORIES               = UI_ENUMS.CATEGORIES;

        this.inspectionStageFilters
            = Object.assign(
                {},
                UI_ENUMS.ANY,
                UI_ENUMS.CATEGORY_PROGRESS);


        this.statusFilters
            = Object.assign(
                {},
                UI_ENUMS.ANY,
                UI_ENUMS.CHECKLIST_ITEM_STATUS);
    }

    $onInit () {
        this.inspectionStageFilter  = this.getCurrentInspectionStageFilter();
        this.statusFilter           = this.getCurrentStatusFilter();

        // this
        //     .JobChecklistStateService
        //     .getChecklistItemsQuantity()
        //     .then((checklistItemsQuantity) => {
        //         this.checklistItemsQuantity = checklistItemsQuantity;
        //     });
    }

    getCurrentInspectionStageFilter () {
        if (this.$stateParams.stageId) {
            return [this.$stateParams.stageId];
        } else {
            return [this.inspectionStageFilters.Any.Key];
        }
    }

    getCurrentStatusFilter () {
        if (this.$stateParams.statusId) {
            return [this.$stateParams.statusId];
        } else {
            return [this.statusFilters.Any.Key];
        }
    }

    getCurrentInspectionStageFilterName () {
        if (this.$stateParams.stageId) {
            const stageKey = _findKey(this.inspectionStageFilters, {Key : this.$stateParams.stageId});

            return this.inspectionStageFilters[stageKey].Name;
        } else {
            return this.inspectionStageFilters.Any.Name;
        }
    }

    getCurrentStatusFilterName () {
        let statusFilter;

        if (this.$stateParams.statusId) {
            const statusKey = _findKey(this.statusFilters, {Key : this.$stateParams.statusId});

            statusFilter = this.statusFilters[statusKey].Name;
        } else {
            statusFilter = 'Any Status';
        }

        if (statusFilter === this.statusFilters.Any.Name) {
            statusFilter = 'Any Status';
        }

        return statusFilter;
    }

    setInspectionStageFilter (response) {
        this.inspectionStageFilter = response;
    }

    setStatusFilter (response) {
        this.statusFilter = response;
    }

    onFilter () {
        const stageId  = this.inspectionStageFilter[0];
        const statusId = this.statusFilter[0];

        if (this.statusFilter[0] !== this.statusFilters.Any.Key) {
            this
                .$state
                .go(
                    this.STATE_NAME.JOB_CHECKLIST_STATUS,
                    {
                        houseId    : this.$stateParams.houseId,
                        stageId    : stageId,
                        statusId   : statusId
                    },
                    {reload : true}
                );
        } else {
            this
                .$state
                .go(
                    this.STATE_NAME.JOB_CHECKLIST_CATEGORY,
                    {
                        houseId    : this.$stateParams.houseId,
                        categoryId : this.$stateParams.categoryId || 'walls',
                        stageId    : stageId
                    },
                    {reload : true}
                );
        }
    }

    get isReview () {
        return this.$state.current.name === this.STATE_NAME.JOB_CHECKLIST_REVIEW_CATEGORY;
    }

    get checklistFilterCriteria () {
        // let plural         = this.checklistItemsQuantity > 1 ? 's' : '';
        let inpectionStage = `${this.getCurrentInspectionStageFilterName()} Inspection Stage`;

        //`checklist item${plural} for ${inpectionStage}, ${this.getCurrentStatusFilterName()}`;
        return `${inpectionStage}, ${this.getCurrentStatusFilterName()}`;
    }
}

export default ChecklistFilterController;
