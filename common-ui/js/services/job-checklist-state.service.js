import _findIndex from 'lodash/findIndex';
import _forOwn from 'lodash/forOwn';
import _forEach from 'lodash/forEach';
import _cloneDeep from 'lodash/cloneDeep';

class JobChecklistState {
    constructor ($log,
                 $stateParams,
                 $q,
                 DisplayLogicDigestService,
                 JobChecklistProgressService,
                 JobDataHomePerformanceService,
                 JobDataResponseService,
                 JobDisplayListService,
                 JobsService,
                 jobTitleFilter,
                 UI_ENUMS) {

        'ngInject';

        this.$log                          = $log;
        this.$stateParams                  = $stateParams;
        this.$q                            = $q;

        this.DisplayLogicDigestService     = DisplayLogicDigestService;
        this.JobChecklistProgressService   = JobChecklistProgressService;
        this.JobDataHomePerformanceService = JobDataHomePerformanceService;
        this.JobDataResponseService        = JobDataResponseService;
        this.JobDisplayListService         = JobDisplayListService;
        this.JobsService                   = JobsService;

        this.jobTitleFilter                = jobTitleFilter;

        this.JOB_STATUS                    = UI_ENUMS.JOB_STATUS;
        this.CATEGORY_PROGRESS             = UI_ENUMS.CATEGORY_PROGRESS;
        this.RATING_TYPES                  = UI_ENUMS.RATING_TYPES;
        this.RESPONSES                     = UI_ENUMS.RESPONSES;
        this.CATEGORIES                    = UI_ENUMS.CATEGORIES;

        this.subItemTable                  = [];

        this.clearState();
    }

    setJobState (jobId) {
        this.jobStatePromise
            = this.$q((resolve, reject) => {
                this
                    .JobsService
                    .getById(jobId)
                    .then((job) => {
                        this.$log.log('JobService Success');

                        this.job         = job;
                        this.jobHouses   = this.getJobHouses();

                        resolve(job);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });

        return this.jobStatePromise;
    }

    setJobDisplayListState () {
        let job          = this.job;
        const jobId      = job._id;
        let housePlanIds = [job.Primary.HousePlan[0]._id];

        if (job.Secondary.length > 0) {
            job.Secondary.forEach(house => {
                housePlanIds.push(house.HousePlan[0]._id);
            });
        }

        this.jobChecklistStatePromise
            = this
                .JobDisplayListService
                .getById(housePlanIds)
                .then((jobDisplayList) => {
                    this.$log.log('JobDisplayListService Success');
                    this.jobDisplayList = jobDisplayList;

                    let JobDataResponsePromise
                        = this.JobDataResponseService
                            .getById(jobId);

                    return JobDataResponsePromise;
                })
                .then((jobDataResponse) => {
                    this.$log.log('JobDataResponseService Success');
                    this.jobDataResponse = jobDataResponse;

                    return this.DisplayLogicDigestService.getPromise();
                })
                .then((digest) => {
                    if (this.job.RatingType === this.RATING_TYPES.HERS.Key && this.JobChecklistProgressService.jobHasNoProgress(this.job.Progress)) {
                        this
                            .jobDataResponse
                            .Progress
                            = this.JobChecklistProgressService.calculateHERSProgress(this.jobDataResponse.Progress, this.jobDisplayList);
                    }

                    return {'status' : 'success'};
                });

        return this.jobChecklistStatePromise;
    }

    setJobHouseState (jobId, HouseId) {
        this.currentHouse    = this.getHouse(parseInt(HouseId, 10));


        let setJobHouseStatePromise = this.$q((resolve, reject) => {
            if (this.jobDataHomePerformance[HouseId] !== undefined) {
                resolve(this.jobDataHomePerformance[HouseId]);
                this.itemStatusQuery = {};
            } else {
                this.JobDataHomePerformanceService
                    .getById(jobId, HouseId)
                    .then((jobDataHomePerformance) => {
                        this.itemStatusQuery = {};
                        this.jobDataHomePerformance[HouseId] = jobDataHomePerformance;
                        resolve(this.jobDataHomePerformance[HouseId]);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
        });

        return setJobHouseStatePromise;
    }

    clearState () {
        this.job                    = {};
        this.jobHouses              = {};
        this.jobDisplayList         = {};
        this.jobDataResponse        = {};
        this.jobDataHomePerformance = {};

        this.itemStatusQuery        = {};

        this.currentHouse           = {};
    }

    getJob () {
        return this.job;
    }

    getJobDisplayList () {
        return this.$q((resolve, reject) => {
            this
                .jobChecklistStatePromise
                .then((status) => {
                    resolve(this.jobDisplayList);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getHouse (HouseId) {
        return this.jobHouses[HouseId];
    }

    getJobHouses () {
        let houses = {};

        houses[this.job.Primary.HouseId]       = this.job.Primary;
        houses[this.job.Primary.HouseId].title = this.jobTitleFilter(this.job.Primary.AddressInformation);

        this.job.Secondary.forEach(house => {
            houses[house.HouseId]       = house;
            houses[house.HouseId].title = this.jobTitleFilter(house.AddressInformation);
        });

        return houses;
    }

    getApplicableHouses (housePlanIds) {
        let houses = [];

        _forOwn(this.jobHouses, (house, key) => {
            if (housePlanIds.indexOf(house.HousePlan[0]._id) >= 0) {
                houses.push({
                    title   : house.title,
                    HouseId : house.HouseId
                });
            }
        });

        return houses;
    }

    getChecklistItemResponse (itemId, itemCategory, itemCategoryProgress) {
        return this.$q((resolve, reject) => {
            resolve(this.jobDataResponse.ChecklistItems[itemCategory][itemCategoryProgress][itemId]);
        });
    }

    getChecklistItemHomePerformance (itemId) {
        return this.$q((resolve, reject) => {
            resolve(this.jobDataHomePerformance[this.currentHouse.HouseId].ChecklistItems[itemId]);
        });
    }

    getChecklistItemHouseplanIds (itemId, itemCategory, itemCategoryProgress) {
        let checklistItems     = this.jobDisplayList[itemCategory][itemCategoryProgress];
        let checklistItemIndex = _findIndex(checklistItems, {checklistItemRef : itemId});
        let houseplanIds       = checklistItems[checklistItemIndex].houses;

        return houseplanIds;
    }

    getChecklistItemHouseTitles (houseIds) {
        return houseIds[0];
    }

    getChecklistItemOptions (itemId) {
        return this.$q((resolve, reject) => {
            this.DisplayLogicDigestService
                .get(itemId)
                .then((result) => {
                    resolve(result.Options);
                });
        });
    }

    getJobCompleteStatus () {
        let status
            = this
                .JobChecklistProgressService
                .jobCompleteStatus(this.jobDataResponse);

        return status;
    }

    getChecklistItemsQuantity () {
        return this.$q((resolve, reject) => {
            this
                .jobChecklistStatePromise
                .then(() => {
                    if (this.$stateParams.categoryId) {
                        let currentCategory = this.CATEGORIES[this.$stateParams.categoryId].Key;

                        resolve(this.jobDataResponse.Progress[currentCategory].PreDrywall.Total + this.jobDataResponse.Progress[currentCategory].Final.Total);
                    } else if (this.$stateParams.stageId) {
                        let currentStage = this.CATEGORY_PROGRESS[this.$stateParams.stageId].Key;
                        let itemsQuantity = 0;

                        _forEach(this.jobDataResponse.Progress, (category) => {
                            itemsQuantity += category[currentStage].Total;
                        });

                        resolve(itemsQuantity);
                    } else {
                        reject();
                    }
                });
        });
    }

    /**
     * Register a sub-item
     * @param  {[type]} itemId           [description]
     * @param  {[type]} showHideCallback [description]
     * @return {[type]}                  [description]
     */
    registerSubItem (itemId, showHideCallback) {
        this.subItemTable[itemId] = showHideCallback;
    }

    omitSubItem (itemId, isOmitted) {
        for (let index in itemId) {
            let callback = this.subItemTable[itemId[index]];
            if (callback !== undefined) {
                callback(isOmitted);
            }
        }
    }

    getJobProgress () {
        return this.$q((resolve, reject) => {
            this
                .jobChecklistStatePromise
                .then((status) => {
                    let progress = _cloneDeep(this.jobDataResponse.Progress);

                    resolve(progress);
                })
                .catch((error)=> {
                    reject(error);
                });
        });
    }

    putJobData () {
        this
            .JobsService
            .put(this.job);
    }

    putJobDataResponse () {
        this
            .JobDataResponseService
            .put(this.jobDataResponse);
    }

    updateHousePhoto (photoData) {
        let secondaryIndex;

        if (this.job.Primary.HouseId === photoData.HouseId) {
            this.job.Primary.Photo = [photoData.photo];
        } else {
            secondaryIndex = _findIndex(this.job.Secondary, {HouseId : photoData.HouseId});

            this.job.Secondary[secondaryIndex].Photo = [photoData.photo];
        }

        this.putJobData();
    }

    updateChecklistResponse (response) {
        let updateResponse = (response.Response.length === 0) ? undefined : response.Response;

        this
            .jobDataResponse
            .ChecklistItems[response.Category][response.CategoryProgress][response.ItemId]
            .Response = updateResponse;

        this
            .jobDataResponse
            .Progress[response.Category]
            = this.JobChecklistProgressService.calculateCategoryProgress(this.jobDataResponse, this.itemStatusQuery);

        this
            .job
            .Progress
            = this.JobChecklistProgressService.calculateJobProgress(this.jobDataResponse.Progress);

        this
            .job
            .ProgressLevel
            = this.JobChecklistProgressService.jobProgressLevel(this.job.Progress);

        this.putJobDataResponse();

        this.putJobData();
    }

    updateChecklistItemData (update) {
        this
            .jobDataResponse
            .ChecklistItems[update.Category][update.CategoryProgress][update.ItemId]
            .ItemData = update.ItemData;

        this
            .jobDataResponse
            .Progress[update.Category]
            = this.JobChecklistProgressService.calculateCategoryProgress(this.jobDataResponse, this.itemStatusQuery);

        this
            .job
            .Progress
            = this.JobChecklistProgressService.calculateJobProgress(this.jobDataResponse.Progress);

        this.putJobDataResponse();

        this.putJobData();
    }

    postComment (comment) {
        this
            .jobDataResponse
            .ChecklistItems[comment.Category][comment.CategoryProgress][comment.ItemId]
            .Comments
            .push(comment.Comment);

        this.putJobDataResponse();
    }

    completeJob () {
        this.job.Status = this.JOB_STATUS.INTERNAL_REVIEW;

        this.putJobData();
    }

    registerItemStatusQuery (id, query) {
        this.itemStatusQuery[id] = query;
    }

}

export default JobChecklistState;
