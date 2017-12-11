import JobsPage from './jobs-page.class.js';

class JobsPageController extends JobsPage {
    flagForReview () {
        const markedJobs = this.jobsHandlers.getSelectedJobs();
        let submitJobs   = [];

        markedJobs.forEach((index) => {
            let job = this.jobs[index];
            if (job.Status === this.JOB_STATUS.COMPLETED && job.InternalReview === false) {
                // TODO - Pop error message to user
                job.InternalReview = true;

                submitJobs.push(this.JobsService.put(job));
            }
        });

        this
            .$q
            .all(submitJobs)
            .then(() => {
                this.$state.transitionTo(this.$state.current, this.$stateParams, {reload : true, inherit : true, notify : true});
            });
    }

    submitToProvider () {
        const markedJobs = this.jobsHandlers.getSelectedJobs();

        this.marked = markedJobs.length;

        this
            .DialogService
            .openDialog(this.DIALOG.SUBMIT_TO_PROVIDER)
            .then((confirmation) => {
                let submitJobs = [];
                if (confirmation) {
                    markedJobs.forEach((index) => {
                        let job = this.jobs[index];
                        if (job.Status === this.JOB_STATUS.COMPLETED) {
                            // TODO - Pop error message to user
                            job.Status          = this.JOB_STATUS.SUBMITTED_TO_PROVIDER;
                            job.InternalReview  = false;
                            job.ProviderCompany = this.selectedProviderToAdd.ProviderRESNETId;

                            submitJobs.push(this.JobsService.put(job));
                        }
                    });

                    this
                        .$q
                        .all(submitJobs)
                        .then(() => {
                            this.$state.transitionTo(this.$state.current, this.$stateParams, {reload : true, inherit : true, notify : true});
                        });
                }
            });
    }
}

export default JobsPageController;
