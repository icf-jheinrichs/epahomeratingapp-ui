import _forEach from 'lodash/forEach';
import _cloneDeep from 'lodash/cloneDeep';

class JobChecklistProgressService {
    constructor (DisplayLogicDigestService, UI_ENUMS) {
        'ngInject';

        this.DisplayLogicDigestService = DisplayLogicDigestService;

        this.CATEGORIES        = UI_ENUMS.CATEGORIES;
        this.CATEGORY_PROGRESS = UI_ENUMS.CATEGORY_PROGRESS;
        this.RATING_TYPES      = UI_ENUMS.RATING_TYPES;
        this.RESPONSES         = UI_ENUMS.RESPONSES;
    }

    /**
     * Test job for progress. Used on job load to determine if first open. On first open JobChecklistStateService will check if hers, and if so will recalculate all job progress counts.
     * @param  {object} jobProgress job progress object from job data
     * @return {integer}            quantity of checklist items that have responses
     */
    jobHasNoProgress (jobProgress) {
        let progressTotal = 0;

        progressTotal += jobProgress.PreDrywall.Verified;
        progressTotal += jobProgress.PreDrywall.MustCorrect;

        progressTotal += jobProgress.Final.Verified;
        progressTotal += jobProgress.Final.MustCorrect;

        return progressTotal === 0;
    }

    calculateHERSProgress (jobDataResponseProgress, jobDisplayList) {
        let hersProgress = _cloneDeep(jobDataResponseProgress);

        _forEach(jobDisplayList, (category, categoryKey) => {
            _forEach(category, (progress, progressKey) => {
                hersProgress[categoryKey][progressKey].Total = 0;

                _forEach(progress, (checklistItem) => {
                    let item
                        = this
                            .DisplayLogicDigestService
                            .getSync(checklistItem.checklistItemRef);

                    if (item.RatingType === this.RATING_TYPES.HERS.Key) {
                        hersProgress[categoryKey][progressKey].Total += 1;
                    }
                });
            });
        });

        return hersProgress;
    }

    /**
     * Triggered after a checklist item is responded to, or if checklist item data is changed
     * @param  {object} jobDataResponse      job response data
     * @param  {object} itemStatusQueries    object containing function calls to query a checklist item to see if it's omitted from the job
     * @return {object}                      updated progress data object
     */
    calculateCategoryProgress (jobDataResponse, itemStatusQueries) {
        let categoryProgress = {
            'PreDrywall' : {
                'Total'       : 0,
                'Verified'    : 0,
                'MustCorrect' : 0
            },
            'Final' : {
                'Total'       : 0,
                'Verified'    : 0,
                'MustCorrect' : 0
            }
        };

        _forEach(itemStatusQueries, (query, key) => {
            let [category, progress, id] = key.split(':');
            let itemStatus = query();

            if (!itemStatus.isOmitted) {
                categoryProgress[progress].Total += 1;

                let response = jobDataResponse.ChecklistItems[category][progress][id].Response;

                if (response !== undefined && response[0] === this.RESPONSES.MustCorrect.Key) {
                    categoryProgress[progress].MustCorrect += 1;
                } else if (response !== undefined) {
                    categoryProgress[progress].Verified += 1;
                }
            }
        });

        return categoryProgress;
    }

    /**
     * Triggered after a checklist item is responded to, or if checklist item data is changed
     * @param  {object} jobDataResponse      job response data
     * @param  {object} itemStatusQueries    object containing function calls to query a checklist item to see if it's omitted from the job
     * @return {object}                      updated progress data object
     */
    calculateCategoryStageProgress (jobDataResponse, itemStatusQueries, response) {
        const category         = response.Category;
        const categoryProgress = response.CategoryProgress;

        let progress = {
            'Total'       : 0,
            'Verified'    : 0,
            'MustCorrect' : 0
        };

        _forEach(itemStatusQueries, (query, key) => {
            let [queryCategory, queryProgress, id] = key.split(':');

            if (category === queryCategory && categoryProgress === queryProgress) {
                let itemStatus = query();

                if (!itemStatus.isOmitted) {
                    progress.Total += 1;

                    let response = jobDataResponse.ChecklistItems[queryCategory][queryProgress][id].Response;

                    if (response !== undefined && response[0] === this.RESPONSES.MustCorrect.Key) {
                        progress.MustCorrect += 1;
                    } else if (response !== undefined) {
                        progress.Verified += 1;
                    }
                }
            }

        });

        console.dir(progress);

        return progress;
    }

    /**
     * Triggered after a checklist item is responded to, or if checklist item data is changed
     * @param  {object} jobDataResponse      job response data
     * @param  {object} itemStatusQueries    object containing function calls to query a checklist item to see if it's omitted from the job
     * @return {object}                      updated progress data object
     */
    calculateStageProgress (jobDataResponse, itemStatusQueries, stageId) {
        let jobProgress = _cloneDeep(jobDataResponse.Progress);
        let STAGE       = stageId;

        _forEach(jobProgress, (value, key) => {
            jobProgress[key][STAGE] = {
                'Total'       : 0,
                'Verified'    : 0,
                'MustCorrect' : 0
            };
        });

        _forEach(itemStatusQueries, (query, key) => {
            let [category, progress, id] = key.split(':');
            let itemStatus = query();

            if (!itemStatus.isOmitted) {
                jobProgress[category][progress].Total += 1;

                let response = jobDataResponse.ChecklistItems[category][progress][id].Response;

                if (response !== undefined && response[0] === this.RESPONSES.MustCorrect.Key) {
                    jobProgress[category][progress].MustCorrect += 1;
                } else if (response !== undefined) {
                    jobProgress[category][progress].Verified += 1;
                }
            }
        });

        return jobProgress;
    }

    calculateJobProgress (jobChecklistResponseProgress) {
        let jobProgress = {
            'PreDrywall' : {
                'Verified'    : 0,
                'MustCorrect' : 0,
                'Total'       : 0
            },
            'Final' : {
                'Verified'    : 0,
                'MustCorrect' : 0,
                'Total'       : 0
            }
        };

        _forEach(jobChecklistResponseProgress, (value, key) => {
            jobProgress.PreDrywall.Verified    += value.PreDrywall.Verified;
            jobProgress.PreDrywall.MustCorrect += value.PreDrywall.MustCorrect;
            jobProgress.PreDrywall.Total       += value.PreDrywall.Total;

            jobProgress.Final.Verified    += value.Final.Verified;
            jobProgress.Final.MustCorrect += value.Final.MustCorrect;
            jobProgress.Final.Total       += value.Final.Total;
        });

        return jobProgress;
    }

    jobProgressLevel (jobProgress) {
        let progressLevel;

        if (jobProgress.PreDrywall.Verified + jobProgress.PreDrywall.MustCorrect < jobProgress.PreDrywall.Total) {
            progressLevel = this.CATEGORY_PROGRESS['pre-drywall'].Key;
        } else {
            progressLevel = this.CATEGORY_PROGRESS['final'].Key;
        }

        return progressLevel;
    }

    jobCompleteStatus (jobDataResponse) {
        let status = {
            MustCorrect     : 0,
            BuilderVerified : 0,
            Remaining       : 0
        };
        let total = 0;
        let completed = 0;

        _forEach(jobDataResponse.ChecklistItems, (category, categoryKey) => {
            _forEach(category, (progress, progressKey) => {
                total     += jobDataResponse.Progress[categoryKey][progressKey].Total;

                completed += jobDataResponse.Progress[categoryKey][progressKey].Verified;
                completed += jobDataResponse.Progress[categoryKey][progressKey].MustCorrect;

                _forEach(progress, (checklistItem, key) => {
                    if (checklistItem.Response) {
                        let response = checklistItem.Response[0];

                        if (response === this.RESPONSES.MustCorrect.Key) {
                            status.MustCorrect += 1;
                        } else if (response === this.RESPONSES.BuilderVerified.Key) {
                            status.BuilderVerified += 1;
                        }
                    }
                });
            });
        });

        status.Remaining = total - completed;

        return status;
    }
}

export default JobChecklistProgressService;
