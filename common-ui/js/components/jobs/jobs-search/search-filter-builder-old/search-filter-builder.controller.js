class SearchFilterBuilderController {
    constructor ($stateParams, UI_ENUMS) {
        'ngInject';

        this.$stateParams = $stateParams;

        this.param   = UI_ENUMS.SEARCH_PARAMS.BUILDERS;
    }

    $onInit () {
        if (this.$stateParams[this.param]) {
            this.builders = decodeURIComponent(this.$stateParams[this.param]).split(',');
        } else {
            this.reset();
        }

        this.registerFilter({
            filter : {
                reset     : this.reset.bind(this),
                serialize : this.serialize.bind(this)
            }
        });

        this.showList = false;
    }

    reset () {
        this.builders = [];
    }

    serialize () {
        let filter = {};

        return filter;
    }
}

export default SearchFilterBuilderController;
