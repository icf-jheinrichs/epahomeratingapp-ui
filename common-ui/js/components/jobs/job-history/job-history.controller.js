class jobHistoryController {
    constructor (
        JobHistoryService
    ) {
        'ngInject';

        this.JobHistoryService = JobHistoryService;
    }

    $onInit () {
        this.history = this.JobHistoryService.parseHistory(this.jobHistory);
    }
}

export default jobHistoryController;
