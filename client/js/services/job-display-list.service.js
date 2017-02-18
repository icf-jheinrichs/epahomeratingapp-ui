import _map from 'lodash/map';
import _findIndex from 'lodash/findIndex';

class JobDisplayListService {
    constructor ($q, $http, API_URL, UI_ENUMS) {
        'ngInject';

        this.$q    = $q;
        this.$http = $http;

        this.API_URL           = API_URL;
        this.CATEGORIES        = UI_ENUMS.CATEGORIES;
        this.CATEGORY_PROGRESS = Object.assign({}, UI_ENUMS.CATEGORY_PROGRESS);
    }

    getById (houseIds) {
        let promise;
        let houseDisplayListPromises = [];

        houseIds.forEach(id => {
            houseDisplayListPromises.push(
                this.$http({
                    method  : 'GET',
                    url     : `${this.API_URL.HOUSE_PLAN}/display_list/${id}`
                })
            );
        });

        promise = this.$q((resolve, reject) => {
            this.$q
                .all(houseDisplayListPromises)
                .then((response) => {
                    let houseDisplayLists = _map(response, 'data');

                    resolve(this.mergeDisplayList(houseDisplayLists));
                })
                .catch((err) => {
                    reject(err);
                });
        });

        return promise;
    }

    mergeDisplayList (houseDisplayLists) {
        let jobDisplayList = {};
        let mergedCategoryProgress;

        for (let category in this.CATEGORIES) {
            let categoryKey = this.CATEGORIES[category].Key;

            jobDisplayList[categoryKey] = {};

            for (let progress in this.CATEGORY_PROGRESS) {
                let progressKey    = this.CATEGORY_PROGRESS[progress].Key;
                let categoryLength = this.getCategoryMaxLength(houseDisplayLists, categoryKey, progressKey);

                jobDisplayList[categoryKey][progressKey] = [];

                for (let index = 0; index < categoryLength; index++) {
                    mergedCategoryProgress = this.getMergedCategoryProgress(houseDisplayLists, index, progressKey, categoryKey);
                    jobDisplayList[categoryKey][progressKey] = jobDisplayList[categoryKey][progressKey].concat(mergedCategoryProgress);
                }
            }
        }

        return jobDisplayList;
    }

    getMergedCategoryProgress (houseDisplayLists, index, progressKey, categoryKey) {
        let mergedCategoryProgress = [];

        houseDisplayLists.forEach(houseDisplayList => {
            let item = houseDisplayList[progressKey][categoryKey][index];
            let mergedIndex;

            if (item === undefined) {
                return;
            }

            mergedIndex = _findIndex(mergedCategoryProgress, mergedItem => {
                return (mergedItem.checklistItemRef === item);
            });

            if (mergedIndex < 0) {
                mergedCategoryProgress.push({
                    'checklistItemRef' : item,
                    'houses'           : [houseDisplayList._id]
                });
            } else {
                mergedCategoryProgress[mergedIndex].houses.push(houseDisplayList._id);
            }
        });

        return mergedCategoryProgress;
    }

    getCategoryMaxLength (houseDisplayLists, category, progress) {
        let maxLength = 0;

        houseDisplayLists.forEach(houseDisplayList => {
            maxLength = Math.max(maxLength, houseDisplayList[progress][category].length);
        });

        return maxLength;
    }
}

export default JobDisplayListService;
