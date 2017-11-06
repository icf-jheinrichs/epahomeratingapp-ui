const buttons = [
    {
        'Name'  : 'Active',
        'Key'   : 'active'
    },
    // {
    //     'Name'  : 'History',
    //     'Key'   : 'history'
    // },
    {
        'Name'  : 'Offline Jobs',
        'Key'   : 'offline-jobs'
    },
    {
        'Name'  : 'Internal Review',
        'Key'   : 'internal-review'
    },
    {
        'Name'  : 'Submitted',
        'Key'   : 'submitted'
    },
    {
        'Name'  : 'Completed',
        'Key'   : 'completed'
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
        this.initialSelected = buttons[0];
    }

    switchPage (selected) {
        // TODO: Make this thing general
        if (selected[0] === 'offline-jobs') {
            this
                .$rootScope
                .$emit(this.MESSAGING.REFRESH_JOBS_LIST, this.JOB_PAGE_TAB.OFFLINE_JOBS);
        } else if (selected[0] === 'history') {
            this
                .$rootScope
                .$emit(this.MESSAGING.REFRESH_JOBS_LIST, this.JOB_PAGE_TAB.HISTORY);
        } else if (selected[0] === 'active') {
            this
                .$rootScope
                .$emit(this.MESSAGING.REFRESH_JOBS_LIST, this.JOB_PAGE_TAB.ACTIVE);
        } else if (selected[0] === 'internal-review') {
            this
                .$rootScope
                .$emit(this.MESSAGING.REFRESH_JOBS_LIST, this.JOB_PAGE_TAB.INTERNAL_REVIEW);
        } else if (selected[0] === 'submitted') {
            this
                .$rootScope
                .$emit(this.MESSAGING.REFRESH_JOBS_LIST, this.JOB_PAGE_TAB.SUBMITTED_TO_PROVIDER);
        } else if (selected[0] === 'completed') {
            this
                .$rootScope
                .$emit(this.MESSAGING.REFRESH_JOBS_LIST, this.JOB_PAGE_TAB.COMPLETED);
        }
    }
}

export default ListFilterController;
