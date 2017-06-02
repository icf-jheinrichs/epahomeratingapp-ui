import _findIndex from 'lodash/findIndex';
import _forOwn from 'lodash/forOwn';

class JobChecklistState {
    constructor ($log, $q, jobTitleFilter, JobsService, JobDisplayListService, JobDataResponseService, JobDataHomePerformanceService) {
        'ngInject';

        this.$log                          = $log;
        this.$q                            = $q;
        this.JobsService                   = JobsService;
        this.JobDisplayListService         = JobDisplayListService;
        this.JobDataResponseService        = JobDataResponseService;
        this.JobDataHomePerformanceService = JobDataHomePerformanceService;

        this.jobTitleFilter                = jobTitleFilter;

        this.clearState();
    }

    setJobState (jobId) {
        let jobChecklistStatePromise
            = this
                .JobsService
                .getById(jobId)
                .then((job) => {
                    this.$log.log('JobService Success');

                    this.job         = job;
                    this.jobHouses   = this.getJobHouses();

                    let housePlanIds = [job.Primary.HousePlan[0]._id];

                    if (job.Secondary.length > 0) {
                        job.Secondary.forEach(house => {
                            housePlanIds.push(house.HousePlan[0]._id);
                        });
                    }

                    let JobDisplayListServicePromise
                        = this.JobDisplayListService
                            .getById(housePlanIds);

                    return JobDisplayListServicePromise;
                })
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

                    return {status : 'success'};
                });

        return jobChecklistStatePromise;
    }

    setJobHouseState (jobId, HouseId) {
        this.currentHouse = this.getHouse(parseInt(HouseId, 10));

        let setJobHouseStatePromise = this.$q((resolve, reject) => {
            if (this.jobDataHomePerformance[HouseId] !== undefined) {
                resolve(this.jobDataHomePerformance[HouseId]);
            } else {
                this.JobDataHomePerformanceService
                    .getById(jobId, HouseId)
                    .then((jobDataHomePerformance) => {
                        this.$log.log('JobDataHomePerformanceService Success');
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

        this.currentHouse           = {};
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

    getChecklistItemHouseplanIds (itemId, itemCategory, itemCategoryProgress) {
        let checklistItems     = this.jobDisplayList[itemCategory][itemCategoryProgress];
        let checklistItemIndex = _findIndex(checklistItems, {checklistItemRef : itemId});
        let houseplanIds       = checklistItems[checklistItemIndex].houses;

        return houseplanIds;
    }

    getChecklistItemHouseTitles (houseIds) {
        return houseIds[0];
    }
}

export default JobChecklistState;
