const ERROR_SERVER = {
    type        : 'error',
    text        : 'There was an error processing your request. Please try again.',
    dismissable : false
};

class HousePlanController {
    constructor ($state, HousePlansService) {
        'ngInject';

        this.$state            = $state;
        this.HousePlansService = HousePlansService;
    }

    onSubmit () {
        this.message = {};

        this.HousePlansService
            .put(this.housePlan)
            .then((response) => {
                this.$state.go('^');
            })
            .catch((error) => {
                this.message = Object.assign({}, ERROR_SERVER);
            });
    }
}

export default HousePlanController;
