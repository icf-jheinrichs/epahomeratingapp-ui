class jobHistoryController {
    constructor ($rootScope, $stateParams, JobChecklistStateService, JobDataHomePerformanceService, ModalService, UI_ENUMS) {
        'ngInject';

        this.$rootScope                    = $rootScope;
        this.$stateParams                  = $stateParams;
        this.JobChecklistStateService      = JobChecklistStateService;
        this.JobDataHomePerformanceService = JobDataHomePerformanceService;
        this.JobChecklistStateService      = JobChecklistStateService;
        this.ModalService                  = ModalService;
    }

    $onInit () {

    }
}

export default jobHistoryController;
