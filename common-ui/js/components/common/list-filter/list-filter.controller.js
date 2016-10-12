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
        this.buttons  = buttons;
    }
}

export default ListFilterController;
