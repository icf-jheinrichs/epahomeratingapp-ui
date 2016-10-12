class ChecklistItemController {
    constructor (DisplayLogicDigestService) {
        'ngInject';

        this.DisplayLogicDigestService = DisplayLogicDigestService;
    }

    $onInit () {
        this.checklistItem = {};

        this
            .DisplayLogicDigestService
            .get('1')
            .then(checklistItemDisplay => {
                this.checklistItem.ShortHand = checklistItemDisplay.ShortHand;
            });
    }
}

export default ChecklistItemController;
