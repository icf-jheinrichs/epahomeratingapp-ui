class jobHistoryController {
    constructor (
        $state,
        $stateParams,
        JobHistoryService,
        JobChecklistStateService,
        jobTitleFilter
    ) {
        'ngInject';

        this.$state       = $state;
        this.$stateParams = $stateParams;

        this.JobHistoryService        = JobHistoryService;
        this.JobChecklistStateService = JobChecklistStateService;
        this.jobTitleFilter           = jobTitleFilter;

        this.HISTORY_TYPES = {
            'NEW' : 'new',
            'OLD' : 'old'
        };
        this.historyType               = undefined;
        this.isHistoryUpdateProcessing = false;
        this.jobIsSample               = this.JobChecklistStateService.getJob().SampleSize > 1;
    }

    $onInit () {
        if (this.jobHistory[0].Description !== undefined) {
            this.historyType = this.HISTORY_TYPES.OLD;
        } else {
            this.history = this.JobHistoryService.parseHistory(this.jobHistory);
            this.historyType = this.HISTORY_TYPES.NEW;
        }
    }

    getHouseTitle (houseId) {
        const house = this.JobChecklistStateService.getHouse(houseId);

        return this.jobTitleFilter(house.AddressInformation);
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
