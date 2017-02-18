const ERROR_SERVER = {
    type        : 'error',
    text        : 'There was an error processing your request. Please try again.',
    dismissable : false
};

class HousePlanController {
    constructor ($rootScope, $state, HousePlansService, UI_ENUMS) {
        'ngInject';

        this.$state            = $state;
        this.$rootScope        = $rootScope;

        this.HousePlansService = HousePlansService;
        this.MESSAGING         = UI_ENUMS.MESSAGING;
        this.isBusy            = false;
    }

    onSubmit () {
        this.message = {};
        this.isBusy  = true;

        this.HousePlansService
            .put(this.housePlan)
            .then((response) => {
                this.$rootScope.$emit(this.MESSAGING.HOUSE_PLAN_UPDATE, this.housePlan);

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

export default HousePlanController;
