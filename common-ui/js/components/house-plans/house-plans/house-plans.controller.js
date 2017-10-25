import _findIndex from 'lodash/findIndex';

class HousePlanController {
    constructor ($rootScope, UI_ENUMS) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.MESSAGING  = UI_ENUMS.MESSAGING;
    }

    $onInit () {
        this.updateHousePlanListener = this.$rootScope.$on(this.MESSAGING.HOUSE_PLAN_UPDATE, (event, housePlan) => {
            let housePlanIndex = _findIndex(this.housePlans.housePlan, {_id : housePlan._id});

            if (housePlanIndex >= 0) {
                this.housePlans.housePlan[housePlanIndex] = housePlan;
            }
        });

        this.newHousePlanListener = this.$rootScope.$on(this.MESSAGING.HOUSE_PLAN_NEW, (event, housePlan) => {
            //TODO: Move this mapping into the house-plan service
            let newHousePlan = {
                BuilderName                : housePlan.builder,
                CommunityName              : housePlan.communityName,
                FileName                   : '',
                HvacDesignReport           : [],
                Name                       : housePlan.buildingName,
                RaterDesignReviewChecklist : [],
                SubplanName                : housePlan.subPlanName,
                _id                        : housePlan.docID
            };

            this.housePlans.housePlan.unshift(newHousePlan);
        });

        this.newHousePlanListener = this.$rootScope.$on(this.MESSAGING.HOUSE_PLAN_NEW_BULK, (event, housePlans) => {
            for (let index in housePlans) {
                let housePlan = housePlans[index];
                let newHousePlan = {
                    BuilderName                : housePlan.builder,
                    CommunityName              : housePlan.communityName,
                    FileName                   : '',
                    HvacDesignReport           : [],
                    Name                       : housePlan.buildingName,
                    RaterDesignReviewChecklist : [],
                    SubplanName                : housePlan.subPlanName,
                    _id                        : housePlan.docID
                };

                this.housePlans.housePlan.unshift(newHousePlan);
            }
        });

        this.deleteHousePlanListener = this.$rootScope.$on(this.MESSAGING.HOUSE_PLAN_DELETE, (event, housePlan) => {
            let housePlanIndex = _findIndex(this.housePlans.housePlan, {_id : housePlan._id});

            if (housePlanIndex >= 0) {
                this.housePlans.housePlan.splice(housePlanIndex, 1);
            }
        });
    }

    $onDestroy () {
        this.updateHousePlanListener();
        this.newHousePlanListener();
    }
}

export default HousePlanController;
