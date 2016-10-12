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

class ChecklistItemMrfController {
    constructor () {
        'ngInject';
    }

    $onInit () {
        this.responseButtons = this.getOptions();
    }

    getOptions () {
        return buttons;
    }
}

export default ChecklistItemMrfController;
