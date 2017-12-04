class SearchFilterReturnedFromInternalController {
    constructor ($stateParams, UI_ENUMS) {
        'ngInject';

        this.$stateParams = $stateParams;

        this.param   = UI_ENUMS.SEARCH_PARAMS.RETURNED_FROM_INTERNAL_REVIEW;
    }

    $onInit () {
        if (this.$stateParams[this.param]) {
            this.returnedFromInternalReview = this.$stateParams[this.param] === 'true';
        } else {
            this.reset();
        }

        this.registerFilter({
            filter : {
                reset     : this.reset.bind(this),
                serialize : this.serialize.bind(this)
            }
        });
    }

    handleSampleSetToggleChange (isOn) {
        this.returnedFromInternalReview = isOn;
    }

    reset () {
        this.returnedFromInternalReview = false;
    }

    serialize () {
        let filter;

        if (this.returnedFromInternalReview) {
            filter = {
                filterKey  : this.param,
                filterName : 'Returned From Internal Review',
                param      : {}
            };

            filter.param[this.param] = 'true';
        }

        return filter;
    }
}

export default SearchFilterReturnedFromInternalController;
