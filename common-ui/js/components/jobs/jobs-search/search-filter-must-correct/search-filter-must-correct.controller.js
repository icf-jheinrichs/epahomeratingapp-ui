class SearchFilterMustCorrectController {
    constructor ($stateParams, UI_ENUMS) {
        'ngInject';

        this.$stateParams = $stateParams;

        this.param   = UI_ENUMS.SEARCH_PARAMS.MUST_CORRECT;
    }

    $onInit () {
        if (this.$stateParams[this.param]) {
            this.mustCorrect = this.$stateParams[this.param] === 'true';
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
        this.mustCorrect = isOn;
    }

    reset () {
        this.mustCorrect = false;
    }

    serialize () {
        let filter;

        if (this.mustCorrect) {
            filter = {
                filterKey  : this.param,
                filterName : 'Must Correct',
                param      : {}
            };

            filter.param[this.param] = 'true';
        }

        return filter;
    }
}

export default SearchFilterMustCorrectController;
