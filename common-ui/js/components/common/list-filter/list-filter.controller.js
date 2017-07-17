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
    constructor ($log, $rootScope, UI_ENUMS) {
        'ngInject';

        this.$rootScope   = $rootScope;
        this.MESSAGING    = UI_ENUMS.MESSAGING;
        this.JOB_PAGE_TAB = UI_ENUMS.JOB_PAGE_TAB;
    }

    $onInit () {
        this.buttons  = buttons;
    }

    switchPage (selected) {
        if (selected[0] === 'offline-jobs') {
            this
                .$rootScope
                .$emit(this.MESSAGING.REFRESH_JOBS_LIST, this.JOB_PAGE_TAB.OFFLINE_JOBS);
        } else if (selected[0] === 'active') {
            this
                .$rootScope
                .$emit(this.MESSAGING.REFRESH_JOBS_LIST, this.JOB_PAGE_TAB.ACTIVE);
        }
    }
}

export default ListFilterController;
