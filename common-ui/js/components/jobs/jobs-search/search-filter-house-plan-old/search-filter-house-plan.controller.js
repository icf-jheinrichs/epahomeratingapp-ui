import _pull from 'lodash/pull';
import _includes from 'lodash/includes';

class SearchFilterHousePlanController {
    constructor ($stateParams, HousePlansService, UI_ENUMS) {
        'ngInject';

        this.$stateParams      = $stateParams;

        this.HousePlansService = HousePlansService;

        this.param             = UI_ENUMS.SEARCH_PARAMS.HOUSE_PLAN;
    }

    $onInit () {
        if (this.$stateParams[this.param]) {
            this.selectedHousePlans = decodeURIComponent(this.$stateParams[this.param]).split(',');
        } else {
            this.reset();
        }

        this.registerFilter({
            filter : {
                reset     : this.reset.bind(this),
                serialize : this.serialize.bind(this)
            }
        });

        this.HousePlansService
            .get()
            .then(housePlans => {
                this.housePlans = housePlans.housePlan;
            });

        this.showSubPanel = false;
    }

    showPanel (toggle) {
        this.showSubPanel = toggle;
        this.onShowSubPanel({
            show : toggle
        });
    }

    toggleHousePlan (id) {
        if (this.housePlanIsSelected(id)) {
            _pull(this.selectedHousePlans, id);
        } else {
            this.selectedHousePlans.push(id);
        }
    }

    housePlanIsSelected (id) {
        return _includes(this.selectedHousePlans, id);
    }

    get selectedQuantity () {
        return (this.selectedHousePlans.length > 0) ? this.selectedHousePlans.length : 'Any';
    }

    reset () {
        this.selectedHousePlans = [];
    }

    serialize () {
        let filter;

        if (this.selectedHousePlans.length) {
            filter = {
                filterKey  : this.param,
                filterName : `${this.selectedHousePlans.length} Rating File`,
                param      : {}
            };

            filter.param[this.param] = this.selectedHousePlans.join(',');
        }

        return filter;
    }
}

export default SearchFilterHousePlanController;
