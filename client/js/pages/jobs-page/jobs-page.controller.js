import _findIndex from 'lodash/findIndex';

class JobsPageController {
    constructor ($log, $rootScope, JobsService, CONTEXT, UI_ENUMS) {
        'ngInject';

        this.$log           = $log;
        this.$rootScope     = $rootScope;

        this.JobsService    = JobsService;

        this.CONTEXT_IS_APP = CONTEXT === UI_ENUMS.CONTEXT.APP;
        this.MESSAGING      = UI_ENUMS.MESSAGING;

        this.QUANTITY = {
            'ALL'      : 'All',
            'SELECTED' : 'Selected'
        };
    }

    $onInit () {
        let self = this;

        this.filterCriteria = 'Jobs';
        this.lastSynced     = 'Yesterday';
        this.syncQuantity   = this.QUANTITY.ALL;

        this.availableOfflineListener
            = this
                .$rootScope
                .$on(this.MESSAGING.JOB_AVAILABLE_OFFLINE, (event, offline) => {
                    let jobIndex = _findIndex(self.jobs, {_id : offline.job});
                    if (offline.offlineAvailable) {
                        this.$log.log(`[jobs-page.controller.js] Enable offline job: ${offline.job}`);
                        this.JobsService.makeAvailableOffline(offline.job);
                    } else {
                        this.$log.log(`[jobs-page.controller.js] Disable offline job: ${offline.job}`);
                        this.JobsService.cancelAvailableOffline(offline.job);
                    }

                    if (jobIndex >= 0) {
                        self.jobs[jobIndex].offlineAvailable = offline.offlineAvailable;
                    }
                });
    }

    $onDestroy () {
        this.availableOfflineListener();
    }
}

export default JobsPageController;
