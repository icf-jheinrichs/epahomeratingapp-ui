class JobDisplayListService {
    constructor ($q, $http, API_URL, UI_ENUMS, DisplayLogicDigestService) {
        'ngInject';

        this.$q    = $q;
        this.$http = $http;

        this.API_URL           = API_URL;

        this.CATEGORIES        = Object.keys(UI_ENUMS.CATEGORIES).map(key => {
            return UI_ENUMS.CATEGORIES[key].Key;
        });

        this.CATEGORY_PROGRESS = Object.keys(UI_ENUMS.CATEGORY_PROGRESS).map(key => {
            return UI_ENUMS.CATEGORY_PROGRESS[key].Key;
        });

        this.displayOrderPromise = DisplayLogicDigestService.getOrder();
    }

    getById (housePlanIds, ratingCompanyID) {
        const houseDisplayListPromises = [];

        housePlanIds.forEach(id => {
            houseDisplayListPromises.push(
                this.$http({
                    method  : 'GET',
                    url     : `${this.API_URL.HOUSE_PLAN}/display_list/${id}`,
                    ratingCompanyID
                })
            );
        });

        return this.$q((resolve, reject) => {
            this.$q
                .all(houseDisplayListPromises)
                .then((response) => {
                    const houseDisplayLists = response.map((houseDisplay) => {
                        return houseDisplay.data;
                    });

                    return this.mergeDisplayList(houseDisplayLists);
                })
                .then((jobDisplayList) => {
                    resolve(jobDisplayList);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    mergeDisplayList (houseDisplayLists) {
        const jobDisplayList = {
            'Walls' : {
                'Final'      : [],
                'PreDrywall' : []
            },
            'CeilingsRoofs' : {
                'Final'      : [],
                'PreDrywall' : []
            },
            'FoundationFloors' : {
                'Final'      : [],
                'PreDrywall' : []
            },
            'Tests' : {
                'Final'      : [],
                'PreDrywall' : []
            },
            'HvacWater' : {
                'Final'      : [],
                'PreDrywall' : []
            },
            'PlugLoadsLightingPv' : {
                'Final'      : [],
                'PreDrywall' : []
            }
        };

        return this.displayOrderPromise
            .then((displayOrder) => {
                this
                    .CATEGORIES
                    .forEach((categoryKey) => {
                        this
                            .CATEGORY_PROGRESS
                            .forEach((progressKey) => {
                                displayOrder[categoryKey][progressKey]
                                    .forEach((item) => {
                                        const checklistItem = {
                                            checklistItemRef : item.checklistItemRef,
                                            houses           : []
                                        };

                                        houseDisplayLists
                                            .forEach((houseDisplayList) => {
                                                if (houseDisplayList[progressKey][categoryKey].includes(checklistItem.checklistItemRef)) {
                                                    checklistItem.houses.push(houseDisplayList._id);
                                                }
                                            });

                                        if (checklistItem.houses.length) {
                                            jobDisplayList[categoryKey][progressKey].push(checklistItem);
                                        }
                                    });
                            });
                    });

                return jobDisplayList;
            });
    }
}

export default JobDisplayListService;
