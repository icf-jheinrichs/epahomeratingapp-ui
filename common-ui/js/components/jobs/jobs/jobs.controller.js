class JobsController {
    constructor (CONTEXT, UI_ENUMS, $window, $scope, $state, $http, $rootScope, JobsService) {
        'ngInject';

        this.CONTEXT_IS_ADMIN = CONTEXT === UI_ENUMS.CONTEXT.ADMIN;

        this.JobsService      = JobsService;
        this.$http            = $http;
        this.$state           = $state;
        this.$scope           = $scope;
        this.$rootScope       = $rootScope;
        this.JOB_STATUS       = UI_ENUMS.JOB_STATUS;
        this.MESSAGING        = UI_ENUMS.MESSAGING;

        this.markedJobs       = [];

        this.downloadingRem   = false;

        this.STATE_NAME       = UI_ENUMS.STATE_NAME;
        this.currentStateName = this.$state.current.name;
    }

    $onInit () {
        this.filterCriteria = 'Jobs';

        for (let i = 0; i < this.jobs.length; i++) {
            this.markedJobs.push(false);
        }

        this.registerHandlers({
            toggleAllJobs   : this.toggleAllJobs.bind(this),
            getSelectedJobs : this.getSelectedJobs.bind(this)
        });
    }

    downloadXml (jobId) {
        this.onDownloadXml({
            jobId
        });
    }

    markJobRegisterd (jobId) {
        this.onMarkJobAsRegistered({
            jobId
        });
    }

    setBulkOperationStatus () {
        this.onSetBulkOperationStatus({
            status : this.jobsAreSelected()
        });
    }

    getSelectedJobs () {
        let filteredMarkedJobs = [];

        this.markedJobs.forEach((isMarked, index) => {
            if (isMarked) {
                filteredMarkedJobs.push(index);
            }
        });

        return filteredMarkedJobs;
    }

    jobsAreSelected () {
        let markedJobsIndex = this.markedJobs.length - 1;
        let markedJob       = false;

        while (!markedJob && (markedJobsIndex + 1)) {
            markedJob = this.markedJobs[markedJobsIndex];
            markedJobsIndex -= 1;
        }

        return markedJob;
    }

    toggleAllJobs (checkAll) {
        for (let i = 0; i < this.markedJobs.length; i++) {
            this.markedJobs[i] = checkAll;
        }

        this.onSetBulkOperationStatus({
            status : checkAll
        });
    }
}

export default JobsController;
