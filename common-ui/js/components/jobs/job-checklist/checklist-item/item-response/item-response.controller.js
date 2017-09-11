class ChecklistItemResponseController {
    constructor (JobChecklistStateService, UI_ENUMS) {
        'ngInject';

        this.JobChecklistStateService = JobChecklistStateService;
        this.RESPONSES                = UI_ENUMS.RESPONSES;
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

    get responseName () {
        return this.response ? this.RESPONSES[this.response].Name : '';
    }

    get responseClass () {
        return this.response ? this.RESPONSES[this.response].Class.replace('btn', 'label') : '';
    }
}

export default ChecklistItemResponseController;
