import _ from 'lodash';

class jobChecklistChecklistController {
    constructor ($rootScope, $stateParams, JobDataHomePerformanceService, CATEGORIES, CATEGORY_PROGRESS) {
        'ngInject';

        this.$rootScope                    = $rootScope;
        this.$stateParams                  = $stateParams;
        this.JobDataHomePerformanceService = JobDataHomePerformanceService;

        this.CATEGORIES        = CATEGORIES;
        this.CATEGORY_PROGRESS = CATEGORY_PROGRESS;

        this.putMrfDataListener = this.$rootScope.$on('putMrfData', (event, mrfData) => {
            this.onPutMrfData(mrfData);
        });
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

    $onDestroy () {
        // deregister listeners
        this.putMrfDataListener();
    }


    onPutMrfData (mrfData) {
        // this.jobDataResponse.ChecklistItems[comment.Category][comment.CategoryProgress][comment.ItemId].Comments.push(comment.Comment);

        this.jobDataHomePerformance.ChecklistItems[mrfData.ItemId][mrfData.key][mrfData.index] = mrfData.mrfData;

        //TODO: put this into a method
        this
            .JobDataHomePerformanceService
            .put(this.jobDataHomePerformance);
    }
}

export default jobChecklistChecklistController;
