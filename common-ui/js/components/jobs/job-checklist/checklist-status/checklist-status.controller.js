import _filter from 'lodash/filter';

class jobChecklistStatusController {
    constructor ($rootScope, $stateParams, JobChecklistStateService, JobDataHomePerformanceService, UI_ENUMS) {
        'ngInject';

        this.$rootScope                    = $rootScope;
        this.$stateParams                  = $stateParams;
        this.JobChecklistStateService      = JobChecklistStateService;
        this.JobDataHomePerformanceService = JobDataHomePerformanceService;
        this.JobChecklistStateService      = JobChecklistStateService;

        this.ANY               = UI_ENUMS.ANY;
        this.MESSAGING         = UI_ENUMS.MESSAGING;
        this.CATEGORIES        = UI_ENUMS.CATEGORIES;
        this.CATEGORY_PROGRESS = UI_ENUMS.CATEGORY_PROGRESS;

        this.putMrfDataListener
            = this
                .$rootScope
                .$on(this.MESSAGING.UPDATE_MRF_DATA, (event, mrfData) => {
                    this.onPutMrfData(mrfData);
                });
    }

    $onInit () {
        //TODO: handle catch error.
        this
            .JobChecklistStateService
            .getJobDisplayList()
            .then(jobDisplayList => {
                this.jobDisplayList = jobDisplayList;

                if (this.$stateParams.stageId === undefined || this.$stateParams.stageId === this.ANY.Any.Key) {
                    this.STAGES = this.CATEGORY_PROGRESS;
                } else {
                    this.STAGES = _filter(this.CATEGORY_PROGRESS, {Key : this.$stateParams.stageId});
                }
            });
    }

    $onDestroy () {
        // deregister listeners
        this.putMrfDataListener();
    }


    onPutMrfData (mrfData) {
        this
            .JobChecklistStateService
            .updateMrfData(mrfData);
    }
}

export default jobChecklistStatusController;
