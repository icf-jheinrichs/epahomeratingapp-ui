//TODO Consider moving this to a config.
const PAGE_SIZE = 5;
const PAGES_TO_SHOW = 5;

class paginationController {
    constructor ($state, $stateParams, UI_ENUMS) {
        'ngInject';

        this.$state       = $state;
        this.$stateParams = $stateParams;

        this.PAGE_PARAM   = UI_ENUMS.SEARCH_PARAMS.PAGE;
    }

    $onInit () {
        this.numberOfPages = Math.ceil(this.quantity / PAGE_SIZE);
        this.pages         = [1, 2, 3, 4, PAGES_TO_SHOW];
        this.currentPage   = this.$stateParams.page || 1;
    }

    setPage (page) {
        this.$state.transitionTo(this.$state.$current.name, {page}, {
            // prevent the events onStart and onSuccess from firing
            notify   : false,
            // prevent reload of the current state
            reload   : false,
            // replace the last record when changing the params so you don't hit the back button and get old params
            location : true,
            // inherit the current params on the url
            inherit  : true
        });
    }
}

export default paginationController;
