class ListFilterController {
    constructor ($stateParams, UI_ENUMS) {
        'ngInject';

        this.$stateParams  = $stateParams;

        this.MESSAGING     = UI_ENUMS.MESSAGING;
        this.JOB_PAGE_TAB  = UI_ENUMS.JOB_PAGE_TAB;
        this.SEARCH_PARAMS = UI_ENUMS.SEARCH_PARAMS;
    }

    $onInit () {
        this.buttons = [
            {
                'Name'   : 'Active',
                'Key'    : 'statusActive',
                'params' : {'status' : 'Active'}
            },
            {
                'Name'   : 'Offline Jobs',
                'Key'    : this.SEARCH_PARAMS.AVAILABLE_OFFLINE,
                'params' : {'availableOffline' : 'true'}
            },
            {
                'Name'   : 'Internal Review',
                'Key'    : this.SEARCH_PARAMS.INTERNAL_REVIEW,
                'params' : {'internalReview' : 'true'}
            },
            {
                'Name'   : 'Submitted',
                'Key'    : 'statusSubmitted',
                'params' : {'status' : 'Submitted'}
            },
            {
                'Name'   : 'Completed',
                'Key'    : 'statusCompleted',
                'params' : {'status' : 'Completed'}
            }
        ];

        if (this.$stateParams[this.SEARCH_PARAMS.STATUS]) {
            this.currentFilter = this.SEARCH_PARAMS.STATUS + this.$stateParams[this.SEARCH_PARAMS.STATUS];
        } else if (this.$stateParams[this.SEARCH_PARAMS.AVAILABLE_OFFLINE]) {
            this.currentFilter = this.SEARCH_PARAMS.AVAILABLE_OFFLINE;
        } else if (this.$stateParams[this.SEARCH_PARAMS.INTERNAL_REVIEW]) {
            this.currentFilter = this.SEARCH_PARAMS.INTERNAL_REVIEW;
        }
    }
}

export default ListFilterController;
