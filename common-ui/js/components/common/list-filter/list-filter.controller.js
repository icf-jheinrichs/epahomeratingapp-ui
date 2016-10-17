const buttons = [
    {
        'Name'  : 'Active',
        'Key'   : 'active'
    },
    {
        'Name'  : 'In QA',
        'Key'   : 'qa'
    },
    {
        'Name'  : 'History',
        'Key'   : 'history'
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
