import Job from '../job.class.js';

class JobProviderController extends Job {
    markJobAsRegistered (jobId) {
        this.onMarkJobRegistered({
            jobId
        });
    }
}

export default JobProviderController;
