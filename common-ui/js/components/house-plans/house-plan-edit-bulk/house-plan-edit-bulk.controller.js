const ERROR_SERVER = {
    type        : 'error',
    text        : 'There was an error processing your request. Please try again.',
    dismissable : false
};

class HousePlanEditBulkController {
    constructor ($q, $rootScope, $scope, $state, $stateParams, HousePlansService, UI_ENUMS) {
        'ngInject';

        this.$q                = $q;
        this.$state            = $state;
        this.$rootScope        = $rootScope;
        this.$scope            = $scope;
        this.$stateParams      = $stateParams;

        this.HousePlansService = HousePlansService;
        this.MESSAGING         = UI_ENUMS.MESSAGING;
        this.isBusy            = false;

        this.housePlan         = {};
        this.currentIndex      = 0;

        this.getCurrentHousePlan();
    }

    getCurrentHousePlan () {
        this.HousePlansService
            .getById(this.$stateParams.housePlanIDs[this.currentIndex])
            .then((housePlan) => {
                this.housePlan = housePlan;
            })
            .catch((error) => {
                this.message = Object.assign({}, ERROR_SERVER);
            })
            .finally(() => {
                this.isBusy = false;
            });
    }

    deleteHousePlan () {
        this.message = {};
        this.isBusy  = true;
        let self = this;

        this.HousePlansService
            .delete(this.housePlan)
            .then((response) => {
                this.$rootScope.$emit(this.MESSAGING.HOUSE_PLAN_DELETE, this.housePlan);

                this.$stateParams.housePlanIDs.splice(this.currentIndex, 1);

                if (this.currentIndex === this.$stateParams.housePlanIDs.length) {
                    this.currentIndex--;
                }

                if (this.$stateParams.housePlanIDs.length === 0) {
                    this.$state.go('^');
                } else {
                    self.getCurrentHousePlan();
                }
            })
            .catch((error) => {
                this.message = Object.assign({}, ERROR_SERVER);
            });
    }

    saveCurrentHousePlan () {
        let promise = this.$q((resolve, reject) => {
            this.HousePlansService
                .put(this.housePlan)
                .then((response) => {
                    this.$rootScope.$emit(this.MESSAGING.HOUSE_PLAN_UPDATE, this.housePlan);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });

        return promise;
    }

    nextHousePlan () {
        let self = this;
        this.isBusy  = true;
        this.saveCurrentHousePlan()
            .then((response) => {
                this.currentIndex++;
                if (this.currentIndex === this.$stateParams.housePlanIDs.length) {
                    this.$state.go('^');
                } else {
                    self.getCurrentHousePlan();
                }
            })
            .catch((error) => {
                this.message = Object.assign({}, ERROR_SERVER);
                this.isBusy = false;
            });
    }

    previousHousePlan () {
        this.currentIndex--;
        this.isBusy = true;
        this.getCurrentHousePlan();
    }

    acceptAll () {
        this.isBusy  = true;
        this.saveCurrentHousePlan()
            .then((response) => {
                this.$state.go('^');
            })
            .catch((error) => {
                this.message = Object.assign({}, ERROR_SERVER);
            })
            .finally(() => {
                this.isBusy = false;
            });
    }
}

export default HousePlanEditBulkController;
