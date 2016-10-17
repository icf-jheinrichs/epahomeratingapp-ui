import _ from 'lodash';

class jobChecklistChecklistController {
    constructor ($stateParams, JobDataHomePerformanceService, CATEGORIES, CATEGORY_PROGRESS) {
        'ngInject';

        this.$stateParams                  = $stateParams;
        this.JobDataHomePerformanceService = JobDataHomePerformanceService;

        this.CATEGORIES        = CATEGORIES;
        this.CATEGORY_PROGRESS = CATEGORY_PROGRESS;
    }

    $onInit () {
        this.categoryKey  = this.CATEGORIES[this.$stateParams.categoryId].Key;
        this.categoryName = this.CATEGORIES[this.$stateParams.categoryId].Name;

        //TODO: handle catch error.
        this.JobDataHomePerformanceService
                .getById(`${this.$stateParams.id}:${this.$stateParams.houseId}`)
                .then(jobDataHomePerformance => {
                    this.jobDataHomePerformance = jobDataHomePerformance;
                });

        this.preDrywallChecklistItems = this.jobDisplayList[this.categoryKey][this.CATEGORY_PROGRESS['pre-drywall'].Key];
        this.finalChecklistItems = this.jobDisplayList[this.categoryKey][this.CATEGORY_PROGRESS['final'].Key];

        this.hasPredrywallItems = !_.isEmpty(this.preDrywallChecklistItems);
        this.hasFinalItems = !_.isEmpty(this.finalChecklistItems);
    }
}

export default jobChecklistChecklistController;
