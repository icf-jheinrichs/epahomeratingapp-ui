class ChecklistItemController {
    constructor (DisplayLogicDigestService) {
        'ngInject';

        this.DisplayLogicDigestService = DisplayLogicDigestService;
    }

    $onInit () {
        this
            .DisplayLogicDigestService
            .get(this.itemId)
            .then(checklistItem => {
                this.checklistItem = checklistItem;
            });
    }
}

export default ChecklistItemController;
