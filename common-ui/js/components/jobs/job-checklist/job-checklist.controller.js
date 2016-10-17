import _ from 'lodash';

class JobChecklistController {
    constructor ($rootScope, JobsService, JobDataResponseService, RESPONSES) {
        'ngInject';

        this.$rootScope             = $rootScope;

        this.JobsService            = JobsService;
        this.JobDataResponseService = JobDataResponseService;
        this.RESPONSES              = RESPONSES;

        //TODO: make enum w/ all messaging names.
        this.$rootScope.$on('setResponse', (event, response) => {
            this.onSetResponse(response);
        });

        this.$rootScope.$on('postComment', (event, comment) => {
            this.onPostComment(comment);
        });
    }

    $onInit () {
        //TODO: make this better
        this.RatingTypeLabel = (this.job.RatingType === 'energy-star') ? 'Energy Star' : 'HERS Rating';

        this.houses              = {
            Primary   : this.job.Primary,
            Secondary : this.job.Secondary
        };
    }

    getRatingTypeClass () {
        //TODO: make this better
        return (this.job.RatingType === 'energy-star') ? 'label-energy-star' : 'label-hers-rating';
    }

    onUpdateHousePhoto (HouseId, photo) {
        let secondaryIndex;

        if (this.job.Primary.HouseId === HouseId) {
            this.job.Primary.Photo = [photo];
        } else {
            secondaryIndex = _.findIndex(this.job.Secondary, {HouseId : HouseId});

            this.job.Secondary[secondaryIndex].Photo = [photo];
        }

        this
            .JobsService
            .put(this.job);
    }

    onSetResponse (response) {
        let updateResponse = (response.Response.length === 0) ? undefined : response.Response;

        this.updateChecklistResponseTotals(response);

        this.jobDataResponse.ChecklistItems[response.Category][response.CategoryProgress][response.ItemId].Response = updateResponse;

        this
            .JobDataResponseService
            .put(this.jobDataResponse);
    }

    onPostComment (comment) {
        this.jobDataResponse.ChecklistItems[comment.Category][comment.CategoryProgress][comment.ItemId].Comments.push(comment.Comment);

        this
            .JobDataResponseService
            .put(this.jobDataResponse);
    }

    updateChecklistResponseTotals (response) {
        let currentResponse = this.jobDataResponse.ChecklistItems[response.Category][response.CategoryProgress][response.ItemId].Response;
        let currentResponseValue = (currentResponse === undefined) ? currentResponse : currentResponse[0];

        let updateResponse = response.Response[0];

        if (currentResponseValue === undefined && updateResponse === this.RESPONSES.MustCorrect.Key) {
            this.jobDataResponse.Progress[response.Category][response.CategoryProgress].MustCorrect += 1;
        } else if (currentResponseValue === undefined) {
            this.jobDataResponse.Progress[response.Category][response.CategoryProgress].Verified += 1;
        } else if (currentResponseValue === this.RESPONSES.MustCorrect.Key && updateResponse !== this.RESPONSES.MustCorrect.Key) {
            this.jobDataResponse.Progress[response.Category][response.CategoryProgress].MustCorrect -= 1;
            this.jobDataResponse.Progress[response.Category][response.CategoryProgress].Verified += 1;
        } else if (currentResponseValue !== this.RESPONSES.MustCorrect.Key && updateResponse === this.RESPONSES.MustCorrect.Key) {
            this.jobDataResponse.Progress[response.Category][response.CategoryProgress].Verified -= 1;
            this.jobDataResponse.Progress[response.Category][response.CategoryProgress].MustCorrect += 1;
        } else if (currentResponseValue === this.RESPONSES.MustCorrect.Key && updateResponse === undefined) {
            this.jobDataResponse.Progress[response.Category][response.CategoryProgress].MustCorrect -= 1;
        } else if (currentResponseValue !== this.RESPONSES.MustCorrect.Key && updateResponse === undefined) {
            this.jobDataResponse.Progress[response.Category][response.CategoryProgress].Verified -= 1;
        }

        this.$rootScope.$broadcast('updateChecklistResponseTotals', this.jobDataResponse.Progress);
    }
}

export default JobChecklistController;
