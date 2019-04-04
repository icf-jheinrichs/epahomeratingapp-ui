import _findIndex from 'lodash/findIndex';
// import _findKey from 'lodash/findKey';
import _forOwn from 'lodash/forOwn';
// import _forEach from 'lodash/forEach';
import _cloneDeep from 'lodash/cloneDeep';

class JobChecklistState {
    constructor (
        $log,
        $state,
        $stateParams,
        $q,
        AuthenticationService,
        AuthorizationService,
        DisplayLogicDigestService,
        GeolocationService,
        JobChecklistProgressService,
        JobDataHomePerformanceService,
        JobDataResponseService,
        JobDisplayListService,
        JobHistoryService,
        JobsService,
        jobTitleFilter,
        UI_ENUMS
    ) {

        'ngInject';

        this.$q                            = $q;
        this.$log                          = $log;
        this.$state                        = $state;
        this.$stateParams                  = $stateParams;
        this.STATE_NAME                    = UI_ENUMS.STATE_NAME;
        this.HISTORY                       = {
            CATEGORIES    : UI_ENUMS.HISTORY_CATEGORIES,
            SUBCATEGORIES : UI_ENUMS.HISTORY_SUBCATEGORIES
        };

        this.AuthenticationService         = AuthenticationService;
        this.DisplayLogicDigestService     = DisplayLogicDigestService;
        this.GeolocationService            = GeolocationService;
        this.JobChecklistProgressService   = JobChecklistProgressService;
        this.JobDataHomePerformanceService = JobDataHomePerformanceService;
        this.JobDataResponseService        = JobDataResponseService;
        this.JobDisplayListService         = JobDisplayListService;
        this.JobHistoryService             = JobHistoryService;
        this.JobsService                   = JobsService;

        this.jobTitleFilter                = jobTitleFilter;

        this.ANY                           = UI_ENUMS.ANY;
        this.JOB_STATUS                    = UI_ENUMS.JOB_STATUS;
        this.CATEGORY_PROGRESS             = UI_ENUMS.CATEGORY_PROGRESS;
        this.RATING_TYPES                  = UI_ENUMS.RATING_TYPES;
        this.RESPONSES                     = UI_ENUMS.RESPONSES;
        this.CATEGORIES                    = UI_ENUMS.CATEGORIES;

        this.subItemTable                  = [];

        this.company                       = AuthorizationService.getCurrentOrganization();

        this.clearState();
    }

    /**
     * Completely clear all state, then request job data.
     *
     * Resolved by the router.
     *
     * @param {string} jobId ID of job to refresh checklist state with
     */
    setJobState (jobId, HouseId, ratingCompanyID) {
        this.clearState();

        this.jobStatePromise
            = this.$q((resolve, reject) => {
                this
                    .JobsService
                    .getById(jobId, ratingCompanyID)
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

    /**
     * Requests the display list for the job,
     * then ensures the display logic digest is resolved,
     * then finally recalculates job progress if the job is a HERS rating type and job has not been responded to.
     *
     * Sets a instance property, jobChecklistStatePromise, to a promise if state has resolved
     */
    setJobDisplayListState (ratingCompanyID) {
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
                .getById(housePlanIds, ratingCompanyID)
                .then((jobDisplayList) => {
                    this.jobDisplayList = jobDisplayList;

                    let JobDataResponsePromise
                        = this
                            .JobDataResponseService
                            .getById(jobId, ratingCompanyID);

                    return JobDataResponsePromise;
                })
                .then((jobDataResponse) => {
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

    /**
     * Set state for requested house, or if state already exists, return existing state.
     *
     * Resolved by route.
     *
     * @param {string} jobId   ID of current job
     * @param {string} HouseId ID of house to retrieve home performance (MRF) data for
     */
    setJobHouseState (jobId, HouseId, ratingCompanyID) {
        this.currentHouse    = this.getHouse(parseInt(HouseId, 10));

        let setJobHouseStatePromise = this.$q((resolve, reject) => {
            if (this.jobDataHomePerformance[HouseId] !== undefined) {
                this.itemStatusQuery = {};
                resolve(this.jobDataHomePerformance[HouseId]);
            } else {
                this.JobDataHomePerformanceService
                    .getById(jobId, HouseId, ratingCompanyID)
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

    /**
     * completely clears the state
     */
    clearState () {
        this.job                    = {};
        this.jobHouses              = {};
        this.jobDisplayList         = {};
        this.jobDataResponse        = {};
        this.jobDataHomePerformance = {};

        this.itemStatusQuery        = {};

        this.currentHouse           = {};
    }

    /**
     * Get reference to job object
     * @return {object} job data object
     */
    getJob () {
        return this.job;
    }

    /**
     * Used by job checklist page controller to satisfy a race condition.
     * @return {promise}
     */
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

    /**
     * Get house data
     * @param  {string} HouseId ID of house
     * @return {object}         House data object
     */
    getHouse (HouseId) {
        return this.jobHouses[HouseId];
    }

    /**
     * Get current house data
     * @return {object}         House data object
     */
    getCurrentHouse () {
        return this.currentHouse;
    }

    /**
     * Create an easily queriable object of the houses in the job. Mitigates the Primay / Secondary props in the job data.
     * @return {object} key indexed object of the houses in the job
     */
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

    /**
     * Used by non-applicable checklist item. Given an array of ids for houses that do apply, return their titles and IDs
     * @param  {array} housePlanIds  array of applicable house IDs
     * @return {array}               array of titles and IDs of applicable houses
     */
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

    /**
     * Return the response for a given checklist item
     * @param  {string} itemId               ID of checklist item
     * @param  {string} itemCategory         category of checklist item (Walls, CeilingsRoofs, etc.)
     * @param  {string} itemCategoryProgress progress of checklist item (PreDrywall or Final)
     * @return {[type]}                      [description]
     */
    getChecklistItemResponse (itemId, itemCategory, itemCategoryProgress) {
        return this.$q((resolve, reject) => {
            resolve(this.jobDataResponse.ChecklistItems[itemCategory][itemCategoryProgress][itemId]);
        });
    }

    /**
     * Return home performance (MRF) data for checklist item in the current house
     * @param  {string} itemId ID of checklist item
     * @return {object}        home performance (MRF) data
     */
    getChecklistItemHomePerformance (itemId) {
        return this.$q((resolve, reject) => {
            resolve(this.jobDataHomePerformance[this.currentHouse.HouseId].ChecklistItems[itemId]);
        });
    }

    /**
     * Get array of house plan IDs that checklist item applies to.
     * @param  {string} itemId               id of checklist item
     * @param  {string} itemCategory         category of checklist item (Walls, CeilingsRoofs, etc.)
     * @param  {string} itemCategoryProgress progress of checklist item (PreDrywall or Final)
     * @return {array}                       array of house plan IDs that checklist item applies to
     */
    getChecklistItemHouseplanIds (itemId, itemCategory, itemCategoryProgress) {
        let checklistItems     = this.jobDisplayList[itemCategory][itemCategoryProgress];
        let checklistItemIndex = _findIndex(checklistItems, {checklistItemRef : itemId});
        let houseplanIds       = checklistItems[checklistItemIndex].houses;

        return houseplanIds;
    }

    /**
     * Use the progress service to tally the job data complete status to check if a job can be completed.
     * @return {object} object with keys MustCorrect, BuilderVerified, and remaining.
     */
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
                    resolve(0);
                    // if (this.$stateParams.categoryId) {
                    //     let currentCategory = this.CATEGORIES[this.$stateParams.categoryId].Key;

                    //     resolve(this.jobDataResponse.Progress[currentCategory].PreDrywall.Total + this.jobDataResponse.Progress[currentCategory].Final.Total);
                    // } else if (this.$stateParams.stageId) {
                    //     const stageKey    = _findKey(this.CATEGORY_PROGRESS, {Key : this.$stateParams.stageId});

                    //     let currentStage  = this.CATEGORY_PROGRESS[stageKey].Key;
                    //     let itemsQuantity = 0;

                    //     _forEach(this.jobDataResponse.Progress, (category) => {
                    //         itemsQuantity += category[currentStage].Total;
                    //     });

                    //     resolve(itemsQuantity);
                    // } else {
                    //     reject();
                    // }
                });
        });
    }

    /**
     * Register a sub checklist item
     * @param  {string}   itemId           id of sub sub checklist item
     * @param  {function} showHideCallback function to call if sub checklist item should change visiblity
     */
    registerSubItem (itemId, showHideCallback) {
        this.subItemTable[itemId] = showHideCallback;
    }

    /**
     * Toggle status of sub checklist items when dropdown selection is changed
     * @param  {boolean} setItemData used to prevent cyclical calls to setItemData on page init
     * @param  {array}  itemId       ids of checklist items that should be shown
     * @param  {object}  itemInfo    Category and CategoryProgress of checklist item
     * @param  {Boolean} isOmitted   wether to show or hide sub item
     */
    omitSubItem (setItemData, itemId, itemInfo, isOmitted) {
        for (let index in itemId) {
            let callback      = this.subItemTable[itemId[index]];
            let checklistItem = this.jobDataResponse.ChecklistItems[itemInfo.Category][itemInfo.CategoryProgress][itemId[index]];

            if (callback !== undefined) {
                callback(isOmitted);
            }

            if (isOmitted && checklistItem !== undefined) {
                checklistItem.Response = undefined;
            }
        }
    }

    /**
     * First wait for checklist state to resolve, then resolve with cloned copy of job progress
     * @return {promise} used to prevent race conditions. wait for all of checklist state to resolve.
     */
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

    /**
     * Save job data to DB (typically for progress  or status updates)
     */
    putJobData () {
        this.job.JobInitiated = true;

        this
            .JobsService
            .put(this.job, this.$stateParams.ratingCompanyID);
    }

    /**
     * Save job checklist response data to DB
     */
    putJobDataResponse () {
        this
            .JobDataResponseService
            .put(this.jobDataResponse);
    }

    formatHistoryRecord (data) {
        const now  = new Date();
        const user = this.AuthenticationService.getUserInfo();

        return this.$q((resolve, reject) => {
            this
                .GeolocationService
                .getLocation()
                .then((position) => {
                    const historyRecord = Object.assign(
                        {
                            DateTime        : now.toUTCString(),
                            UserId          : user.userId,
                            UserName        : `${user.firstName} ${user.lastName}`,
                            LatLongAccuracy : position
                        },
                        data
                    );

                    resolve(this.JobHistoryService.serializeHistoryRecord(historyRecord));
                });
        });
    }

    /**
     * Update state with photo for house, then call putJobData
     * @param  {object} photoData ID of house to update, URL of photo
     */
    updateHousePhoto (photoData) {
        this
            .formatHistoryRecord({
                Category    : this.HISTORY.CATEGORIES.EDITED,
                Subcategory : this.HISTORY.SUBCATEGORIES.EDITED.PHOTO,
                Data        : `${photoData.HouseId}: ${photoData.key}`
            })
            .then((historyRecord) => {
                this.job
                    .History
                    .push(historyRecord);

                let secondaryIndex;

                if (this.job.Primary.HouseId === photoData.HouseId) {
                    this.job.Primary.Photo[photoData.key] = photoData.photo;
                } else {
                    secondaryIndex = _findIndex(this.job.Secondary, {HouseId : photoData.HouseId});

                    this.job.Secondary[secondaryIndex].Photo[photoData.key] = photoData.photo;
                }

                this.putJobData();
            });
    }

    /**
     * Update state of current house with home performance (MRF) data, then put home performance data to DB
     * @param  {object} mrfEditData home performance (MRF) data
     * @return {[type]}             [description]
     */
    updateMrfData (mrfEditData) {
        this
            .formatHistoryRecord({
                Category    : this.HISTORY.CATEGORIES.EDITED,
                Subcategory : this.HISTORY.SUBCATEGORIES.EDITED.EDIT_MRF,
                Data        : `[${mrfEditData.ItemId}: ${mrfEditData.title}] ${mrfEditData.key}`
            })
            .then((historyRecord) => {
                this.job
                    .History
                    .push(historyRecord);

                this
                    .jobDataHomePerformance[this.currentHouse.HouseId]
                    .ChecklistItems[mrfEditData.ItemId][mrfEditData.key][mrfEditData.index] = mrfEditData.mrfData;

                this
                    .JobDataHomePerformanceService
                    .put(this.jobDataHomePerformance[this.currentHouse.HouseId]);

                this.putJobData();
            });
    }

    /**
     * Update state of current job:
     * - checklist item response
     * - house id that checklist item was responded on
     * - updated job data response progress
     * - updated job progress
     * - updated job progress level (pre-drywall or final)
     *
     * Put job response data to DB
     * Put job data to DB
     *
     * @param  {object} response [selected response meta and response]
     */
    updateChecklistResponse (response) {
        let updateResponse = (response.Response.length === 0) ? undefined : response.Response;

        this
            .jobDataResponse
            .ChecklistItems[response.Category][response.CategoryProgress][response.ItemId]
            .Response = updateResponse;

        this
            .jobDataResponse
            .ChecklistItems[response.Category][response.CategoryProgress][response.ItemId]
            .ResponseHouseId = this.currentHouse.HouseId;

        this
            .jobDataResponse
            .Progress[response.Category][response.CategoryProgress]
            = this.JobChecklistProgressService.calculateCategoryStageProgress(this.jobDataResponse, this.itemStatusQuery, response);

        this
            .job
            .Progress
            = this.JobChecklistProgressService.calculateJobProgress(this.jobDataResponse.Progress);

        this
            .job
            .ProgressLevel
            = this.JobChecklistProgressService.jobProgressLevel(this.job.Progress);

        this
            .job
            .BuilderMustCorrect
            = this.JobChecklistProgressService.builderMustCorrect(this.job.Progress);

        this
            .formatHistoryRecord({
                Category    : this.HISTORY.CATEGORIES.EDITED,
                Subcategory : response.CategoryProgress === this.CATEGORY_PROGRESS['pre-drywall'].Key ? this.HISTORY.SUBCATEGORIES.EDITED.UPDATE_PREDRYWALL : this.HISTORY.SUBCATEGORIES.EDITED.UPDATE_FINAL,
                Data        : `[${response.Category} ${response.CategoryProgress}: ${response.ItemId}] ${response.Response[0]}`
            })
            .then((historyRecord) => {
                this.job
                    .History
                    .push(historyRecord);

                this.putJobDataResponse();
                this.putJobData();
            });
    }

    /**
     * Update state of current job with:
     * - item data
     * - job progress, specific to current category, in the case item data update has changed progress
     * - job progress in the case item data update has changed progress
     *
     * Put job response data to DB
     * Put job data to DB
     *
     * @param  {object} update [item data meta and updated item data]
     */
    updateChecklistItemData (update) {
        this
            .jobDataResponse
            .ChecklistItems[update.Category][update.CategoryProgress][update.ItemId]
            .ItemData = update.ItemData;

        this
            .jobDataResponse
            .Progress[update.Category][update.CategoryProgress]
            = this.JobChecklistProgressService.calculateCategoryStageProgress(this.jobDataResponse, this.itemStatusQuery, update);

        this
            .job
            .Progress
            = this.JobChecklistProgressService.calculateJobProgress(this.jobDataResponse.Progress);

        this.putJobDataResponse();
        this.putJobData();
    }

    getProviderComment () {
        return this.job.ProviderComment ? JSON.parse(this.job.ProviderComment) : '';
    }

    putProviderComment (providerComment) {
        this.job.ProviderComment = providerComment;

        this
            .formatHistoryRecord({
                Category    : this.HISTORY.CATEGORIES.STATUS,
                Subcategory : this.HISTORY.SUBCATEGORIES.STATUS.PROVIDER_COMMENT,
                Data        : this.company.Name
            })
            .then((historyRecord) => {
                this.job
                    .History
                    .push(historyRecord);

                this.putJobData();
            });
    }

    /**
     * Update job response state with checklist item comment, then call putJobData
     * @param  {object} photoData ID of house to update, URL of photo
     */
    postComment (comment) {
        const historyRecordPromises = [];

        this
            .jobDataResponse
            .ChecklistItems[comment.Category][comment.CategoryProgress][comment.ItemId]
            .Comments
            .push(comment.Comment);

        historyRecordPromises.push(this
            .formatHistoryRecord({
                Category    : this.HISTORY.CATEGORIES.EDITED,
                Subcategory : this.HISTORY.SUBCATEGORIES.EDITED.COMMENT
            }));

        if (comment.Comment.PhotoUrl) {
            historyRecordPromises.push(this
                .formatHistoryRecord({
                    Category    : this.HISTORY.CATEGORIES.EDITED,
                    Subcategory : this.HISTORY.SUBCATEGORIES.EDITED.COMMENT_PHOTO
                }));
        }

        this
            .$q
            .all(historyRecordPromises)
            .then((historyRecords) => {
                historyRecords
                    .forEach((historyRecord) => {
                        this.job
                            .History
                            .push(historyRecord);
                    });

                this.putJobData(); // update the job data object so that job set to JobInitiated = true
                this.putJobDataResponse();
            });
    }

    /**
     * Set status as submitted to provider and add ID of provider submitted to
     * @return {[type]} [description]
     */
    submitJob (Provider) {
        this
            .formatHistoryRecord({
                Category    : this.HISTORY.CATEGORIES.STATUS,
                Subcategory : this.HISTORY.SUBCATEGORIES.STATUS.SUBMITTED_TO_PROVIDER,
                Data        : Provider.Name
            })
            .then((historyRecord) => {
                this.job
                    .History
                    .push(historyRecord);

                this.job.Status          = this.JOB_STATUS.SUBMITTED_TO_PROVIDER;
                this.job.InternalReview  = false;
                this.job.ProviderCompany = Provider.O_ID;

                this.putJobData();
            });
    }

    /**
     * Update job state as complete, then call putJobData
     */
    completeJob () {
        this
            .formatHistoryRecord({
                Category    : this.HISTORY.CATEGORIES.STATUS,
                Subcategory : this.HISTORY.SUBCATEGORIES.STATUS.COMPLETED
            })
            .then((historyRecord) => {
                this.job
                    .History
                    .push(historyRecord);

                this.job.Status = this.JOB_STATUS.COMPLETED;

                this.putJobData();
            });
    }

    /**
     * Flag job for review, then call putJobData
     */
    flagJobForReview () {
        this
            .formatHistoryRecord({
                Category    : this.HISTORY.CATEGORIES.STATUS,
                Subcategory : this.HISTORY.SUBCATEGORIES.STATUS.INTERNAL_REVIEW
            })
            .then((historyRecord) => {
                this.job
                    .History
                    .push(historyRecord);

                this.job.InternalReview = true;

                this.putJobData();
            });
    }

    markAsRegistered () {
        this
            .formatHistoryRecord({
                Category    : this.HISTORY.CATEGORIES.STATUS,
                Subcategory : this.HISTORY.SUBCATEGORIES.STATUS.INTERNAL_REVIEW
            })
            .then((historyRecord) => {
                this.job
                    .History
                    .push(historyRecord);

                this.job.Status = this.JOB_STATUS.REGISTERED;

                this.putJobData();
            });
    }

    /**
     * Create objects of callbacks to get data from checklist item
     * @param  {string}   id    id of the checklist item in the format of "itemCategory:itemCategoryProgress:itemId"
     * @param  {function} query callback to get checklist item status
     */
    registerItemStatusQuery (id, query) {
        this.itemStatusQuery[id] = query;
    }

    /**
     * Get list of must correct and builder verified items for the builder report PDF
     * @return {array} array of checklist element objects
     */
    getCheckListElementsForBuilderReport () {
        let elements = [];
        let checklist = this.jobDataResponse.ChecklistItems;

        for (let category in checklist) {
            for (let stage in checklist[category]) {
                for (let element in checklist[category][stage]) {
                    let checklistElement = checklist[category][stage][element];

                    for (let response in checklistElement.Response) {
                        let responseStr = checklistElement.Response[response];

                        if (responseStr === 'MustCorrect' || responseStr === 'BuilderVerified') {
                            checklistElement['category'] = category;
                            checklistElement['stage'] = stage;
                            checklistElement['element'] = element;
                            elements.push(checklistElement);
                        }
                    }
                }
            }
        }
        return elements;
    }

    getJobHistory () {
        return this.job.History;
    }

    updateJobHistory (updatedHistory) {
        this.job.History = JSON.parse(JSON.stringify(updatedHistory));

        return this.JobsService.put(this.job, this.$stateParams.ratingCompanyID);
    }

    get isReview () {
        const currentState = this.$state.current.name;
        return currentState === this.STATE_NAME.JOB_CHECKLIST_REVIEW || currentState === this.STATE_NAME.JOB_CHECKLIST_REVIEW_CATEGORY;
    }
}

export default JobChecklistState;
