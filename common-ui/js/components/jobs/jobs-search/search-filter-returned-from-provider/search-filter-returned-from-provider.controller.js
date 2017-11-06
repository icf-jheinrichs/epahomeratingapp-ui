class SearchFilterReturnedFromProviderController {
    constructor ($stateParams, UI_ENUMS) {
        'ngInject';

        this.$stateParams = $stateParams;

        this.param   = UI_ENUMS.SEARCH_PARAMS.RETURNED_FROM_PROVIDER_REVIEW;
    }

    $onInit () {
        if (this.$stateParams[this.param]) {
            this.returnedFromProviderReview = this.$stateParams[this.param] === 'true';
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
        this.returnedFromProviderReview = isOn;
    }

    reset () {
        this.returnedFromProviderReview = false;
    }

    serialize () {
        let filter;

        if (this.returnedFromProviderReview) {
            filter = {
                filterKey  : this.param,
                filterName : 'Returned From Provider Review',
                param      : {}
            };

            filter.param[this.param] = 'true';
        }

        return filter;
    }
}

export default SearchFilterReturnedFromProviderController;
