class jobChecklistStageController {
    constructor ($rootScope, $stateParams, JobChecklistStateService, JobDataHomePerformanceService, UI_ENUMS) {
        'ngInject';

        this.$rootScope                    = $rootScope;
        this.$stateParams                  = $stateParams;
        this.JobChecklistStateService      = JobChecklistStateService;
        this.JobDataHomePerformanceService = JobDataHomePerformanceService;
        this.JobChecklistStateService      = JobChecklistStateService;

        this.MESSAGING         = UI_ENUMS.MESSAGING;
        this.CATEGORIES        = UI_ENUMS.CATEGORIES;
        this.CATEGORY_PROGRESS = UI_ENUMS.CATEGORY_PROGRESS;

        this.stageKey          = this.CATEGORY_PROGRESS[$stateParams.stageId].Key;

        this.putMrfDataListener = this.$rootScope.$on(this.MESSAGING.UPDATE_MRF_DATA, (event, mrfData) => {
            this.onPutMrfData(mrfData);
        });
    }

    $onInit () {
        //TODO: handle catch error.
        this.JobDataHomePerformanceService
                .getById(this.$stateParams.id, this.$stateParams.houseId)
                .then(jobDataHomePerformance => {
                    this.jobDataHomePerformance = jobDataHomePerformance;
                });
    }

    $onDestroy () {
        // deregister listeners
        this.putMrfDataListener();
    }


    onPutMrfData (mrfData) {
        this
            .jobDataHomePerformance
            .ChecklistItems[mrfData.ItemId][mrfData.key][mrfData.index] = mrfData.mrfData;

        this
            .JobDataHomePerformanceService
            .put(this.jobDataHomePerformance);
    }
}

export default jobChecklistStageController;
