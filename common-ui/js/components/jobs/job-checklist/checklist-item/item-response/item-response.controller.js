class ChecklistItemResponseController {
    constructor ($stateParams, JobChecklistStateService, UI_ENUMS) {
        'ngInject';

        this.JobChecklistStateService = JobChecklistStateService;
        this.RESPONSES                = UI_ENUMS.RESPONSES;

        this.isReview                 = this.JobChecklistStateService.isReview;
        this.stateHouseId             = parseInt($stateParams.houseId, 10);
    }

    $onChanges (changes) {
        if (changes.responseHouseId && !changes.responseHouseId.isFirstChange()) {
            this.house
                = this
                    .JobChecklistStateService
                    .getHouse(parseInt(this.responseHouseId, 10));
        }

        if (changes.response && !changes.response.isFirstChange()) {
            this.response = changes.response.currentValue[0];
        }
    }

    get showHouseTitle () {
        return (this.responseHouseId !== undefined) && (this.stateHouseId !== this.responseHouseId);
    }

    get responseName () {
        return this.response && this.response.length ? this.RESPONSES[this.response].Name : '';
    }

    get responseClass () {
        return this.response && this.response.length ? this.RESPONSES[this.response].Class.replace('btn', 'label') : '';
    }
}

export default ChecklistItemResponseController;
