class SearchFilterHousePlanController {
    constructor ($stateParams, SanitizeService, $sanitize, UI_ENUMS) {
        'ngInject';

        this.$stateParams       = $stateParams;
        this.$sanitize          = $sanitize;
        this.SanitizeService    = SanitizeService;
        this.param   = UI_ENUMS.HOUSE_PLANS_SEARCH_PARAMS.KEYWORDS;
    }

    $onInit () {
        if (this.$stateParams[this.param]) {
            this.keywords = decodeURIComponent(this.$stateParams[this.param]);
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

    reset () {
        this.keywords = '';
    }

    serialize () {
        let filter;

        if (this.keywords.length > 0) {
            filter = {
                filterKey  : this.param,
                filterName : this.keywords,
                param      : {}
            };

            filter.param[this.param] = encodeURIComponent(this.SanitizeService.sanitize(this.keywords));
        }

        return filter;
    }
}

export default SearchFilterHousePlanController;
