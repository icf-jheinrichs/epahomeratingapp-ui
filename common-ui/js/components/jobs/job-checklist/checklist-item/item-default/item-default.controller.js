const buttons = [
    {
        'display' : 'Rater Verified',
        'value'   : 'rater-verified'
    },
    {
        'display' : 'Must Correct',
        'value'   : 'must-correct'
    },
    {
        'display' : 'Builder Verified',
        'value'   : 'builder-verified'
    },
    {
        'display' : 'N/A',
        'value'   : 'na'
    }
];

class ChecklistItemDefaultController {
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
                this.checklistItem.Shorthand = checklistItemDisplay.Shorthand;
            });


        this.responseButtons = this.getOptions();
    }

    getOptions () {
        return buttons;
    }
}

export default ChecklistItemDefaultController;
