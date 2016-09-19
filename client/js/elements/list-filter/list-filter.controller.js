const buttons = [
    {
        'display' : 'Active',
        'value'   : 'active'
    },
    {
        'display' : 'In QA',
        'value'   : 'qa'
    },
    {
        'display' : 'History',
        'value'   : 'history'
    }
];

class ListFilterController {
    constructor ($log) {
        'ngInject';
    }

    $onInit () {
        this.quantity = 35;
        this.criteria = 'Active Jobs, ENERGY STAR Rating, Builder Name A, House Plan Name';
        this.buttons  = buttons;
    }
}

export default ListFilterController;
