import _findIndex from 'lodash/findIndex';

import JobsPage from '../jobs-page/jobs-page.class.js';

class JobsProviderPageController extends JobsPage {
    $onInit () {
        super.$onInit();

        let raterCompanyIndex = 0;

        if (this.$stateParams.rater) {
            raterCompanyIndex = _findIndex(this.company.RelatedRaterCompanys, {
                _id : this.$stateParams.rater
            });
        }

        this.selectedRater = this.company.RelatedRaterCompanys[raterCompanyIndex];

        if (this.$stateParams.status) {
            this.currentState = this.$stateParams.status;
        }

        this.pageStart = 0,
        this.pageEnd   = this.PAGE_SIZE;

        this.viewJobs = this.jobs.slice(this.pageStart, this.pageEnd);
    }

    setPage (page) {
        this.pageStart = this.PAGE_SIZE * (page - 1);
        this.pageEnd   = this.pageStart + this.PAGE_SIZE;

        this.checkAll = false;
        this.toggleAllJobs();

        this.viewJobs = this.jobs.slice(this.pageStart, this.pageEnd);

        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    markJobRegistered (jobId) {
        let markedJobIndex = _findIndex(this.jobs, {
            _id : jobId
        });

        let job    = this.jobs[markedJobIndex];
        job.Status = this.JOB_STATUS.REGISTERED;

        this
            .JobsService
            .put(job, this.selectedRater.O_ID);
    }

    showMarkAsRegistered () {
        return (this.$stateParams.status !== 'Registered');
    }

    markAsRegistered () {
        const markedJobs = this.jobsHandlers.getSelectedJobs();
        let submitJobs   = [];

        markedJobs.forEach((index) => {
            let job = this.viewJobs[index];
            if (job.Status === this.JOB_STATUS.SUBMITTED_TO_PROVIDER) {
                // TODO - Pop error message to user
                job.Status = this.JOB_STATUS.REGISTERED;

                submitJobs.push(this.JobsService.put(job, this.selectedRater.O_ID));
            }
        });

        this
            .$q
            .all(submitJobs)
            .then(() => {
                this
                    .$state
                    .transitionTo(
                        this.$state.current,
                        this.$stateParams,
                        {reload : true, inherit : true, notify : true}
                    );
            });
    }

    handleRatingCompanyChange () {
        this
            .$state
            .go(this.STATE_NAME.JOBS_PROVIDER_SEARCH, {rater : this.selectedRater._id});
    }
}

export default JobsProviderPageController;
