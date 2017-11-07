class ListFilterController {
    constructor ($stateParams, UI_ENUMS) {
        'ngInject';

        this.$stateParams  = $stateParams;

        this.MESSAGING     = UI_ENUMS.MESSAGING;
        this.JOB_PAGE_TAB  = UI_ENUMS.JOB_PAGE_TAB;
        this.SEARCH_PARAMS = UI_ENUMS.SEARCH_PARAMS;
        this.JOB_STATUS    = UI_ENUMS.JOB_STATUS;
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
                'Key'    : 'statusSubmitted to Provider',
                'params' : {'status' : encodeURIComponent(this.JOB_STATUS.SUBMITTED_TO_PROVIDER)}
            },
            {
                'Name'   : 'Completed',
                'Key'    : 'statusCompleted',
                'params' : {'status' : encodeURIComponent(this.JOB_STATUS.COMPLETED)}
            }
        ];

        if (this.$stateParams[this.SEARCH_PARAMS.STATUS]) {
            this.currentFilter = this.SEARCH_PARAMS.STATUS + decodeURIComponent(this.$stateParams[this.SEARCH_PARAMS.STATUS]);
        } else if (this.$stateParams[this.SEARCH_PARAMS.AVAILABLE_OFFLINE]) {
            this.currentFilter = this.SEARCH_PARAMS.AVAILABLE_OFFLINE;
        } else if (this.$stateParams[this.SEARCH_PARAMS.INTERNAL_REVIEW]) {
            this.currentFilter = this.SEARCH_PARAMS.INTERNAL_REVIEW;
        }
    }
}

export default ListFilterController;
