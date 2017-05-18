const buttons = [
    {
        'Name'  : 'Active',
        'Key'   : 'active'
    },
    {
        'Name'  : 'Internal Review',
        'Key'   : 'internal-review'
    },
    {
        'Name'  : 'History',
        'Key'   : 'history'
    },
    {
        'Name'  : 'Offline Jobs',
        'Key'   : 'offline-jobs'
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
