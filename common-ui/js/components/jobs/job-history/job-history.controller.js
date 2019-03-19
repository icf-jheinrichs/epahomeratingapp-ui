class jobHistoryController {
    constructor (
        $state,
        $stateParams,
        JobHistoryService,
        JobChecklistStateService
    ) {
        'ngInject';

        this.$state       = $state;
        this.$stateParams = $stateParams;

        this.JobHistoryService        = JobHistoryService;
        this.JobChecklistStateService = JobChecklistStateService;

        this.HISTORY_TYPES = {
            'NEW' : 'new',
            'OLD' : 'old'
        };
        this.historyType               = undefined;
        this.isHistoryUpdateProcessing = false;
    }

    $onInit () {
        if (this.jobHistory[0].Description !== undefined) {
            this.historyType = this.HISTORY_TYPES.OLD;
        } else {
            this.history = this.JobHistoryService.parseHistory(this.jobHistory);
            this.historyType = this.HISTORY_TYPES.NEW;
        }
    }

    updateHistoryFormat () {
        if (this.isHistoryUpdateProcessing) {
            return;
        }

        let updatedHistory = this.JobHistoryService.updateHistory(this.jobHistory);
        this.isHistoryUpdateProcessing = true;

        this
            .JobChecklistStateService
            .updateJobHistory(updatedHistory)
            .finally((response) => {
                this
                    .$state
                    .transitionTo(
                        this.$state.current,
                        this.$stateParams,
                        {reload : true, inherit : true, notify : true}
                    );
            });
    }
}

export default jobHistoryController;
