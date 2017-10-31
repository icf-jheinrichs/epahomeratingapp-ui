import _findIndex from 'lodash/findIndex';

class JobsPageController {
    constructor ($log, $rootScope, JobsService, CONTEXT, UI_ENUMS) {
        'ngInject';

        this.$log           = $log;
        this.$rootScope     = $rootScope;

        this.JobsService    = JobsService;

        this.CONTEXT_IS_APP = CONTEXT === UI_ENUMS.CONTEXT.APP;
        this.JOB_PAGE_TAB   = UI_ENUMS.JOB_PAGE_TAB;
        this.JOB_STATUS     = UI_ENUMS.JOB_STATUS;
        this.MESSAGING      = UI_ENUMS.MESSAGING;

        this.QUANTITY = {
            'ALL'      : 'All',
            'SELECTED' : 'Selected'
        };

        this.currentJobTab = this.JOB_PAGE_TAB.ACTIVE;
    }

    $onInit () {
        this.filterCriteria = 'Jobs';

        this.availableOfflineListener
            = this
                .$rootScope
                .$on(this.MESSAGING.JOB_AVAILABLE_OFFLINE, (event, offline) => {
                    let jobIndex = _findIndex(this.jobs, {_id : offline.job});
                    if (offline.offlineAvailable) {
                        this.$log.log(`[jobs-page.controller.js] Enable offline job: ${offline.job}`);
                        this.JobsService.makeAvailableOffline(offline.job);
                    } else {
                        this.$log.log(`[jobs-page.controller.js] Disable offline job: ${offline.job}`);
                        this.JobsService.cancelAvailableOffline(offline.job);
                    }

                    if (jobIndex >= 0) {
                        this.jobs[jobIndex].offlineAvailable = offline.offlineAvailable;
                    }
                });

        this.refreshJobsListener
            = this
                .$rootScope
                .$on(this.MESSAGING.REFRESH_JOBS_LIST, (event, tab) => {
                    if (tab !== undefined) {
                        this.currentJobTab = tab;
                    }

                    this.jobs = {};
                    this.JobsService
                        .get()
                        .then((jobs) => {
                            this.jobs = this.filterJobs(jobs);
                        });
                });
    }

    filterJobs (jobs) {
        let filteredJobs = [];

        console.log(this.currentJobTab);

        for (let index in jobs) {
            let job = jobs[index];
            switch (this.currentJobTab) {
            case this.JOB_PAGE_TAB.OFFLINE_JOBS:
                if (jobs[index].offlineAvailable) {
                    filteredJobs.push(job);
                }
                break;
            case this.JOB_PAGE_TAB.ACTIVE:
                if (jobs[index].Status === this.JOB_STATUS.ACTIVE) {
                    filteredJobs.push(job);
                }
                break;
            case this.JOB_PAGE_TAB.COMPLETED:
                if (jobs[index].Status === this.JOB_STATUS.COMPLETED) {
                    filteredJobs.push(job);
                }
                break;
            case this.JOB_PAGE_TAB.INTERNAL_REVIEW:
                if (jobs[index].Status === this.JOB_STATUS.INTERNAL_REVIEW) {
                    filteredJobs.push(job);
                }
                break;
            case this.JOB_PAGE_TAB.SUBMITTED_TO_PROVIDER:
                if (jobs[index].Status === this.JOB_STATUS.SUBMITTED_TO_PROVIDER) {
                    filteredJobs.push(job);
                }
                break;
            default:

            }
        }

        return filteredJobs;
    }

    $onDestroy () {
        this.availableOfflineListener();
        this.refreshJobsListener();
    }
}

export default JobsPageController;
