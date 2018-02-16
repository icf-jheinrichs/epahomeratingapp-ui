import _forOwn from 'lodash/forOwn';
// import _find from 'lodash/find';

class HousePlansSearchController {
    constructor ($state, $stateParams, CONTEXT, UI_ENUMS) {
        'ngInject';

        this.$state       = $state;
        this.$stateParams = $stateParams;

        this.CONTEXT_IS_APP    = CONTEXT === UI_ENUMS.CONTEXT.APP;
        this.SEARCH_PARAMS     = UI_ENUMS.SEARCH_PARAMS;
        this.STATE_NAME        = UI_ENUMS.STATE_NAME;

        this.filters    = [];
        this.filterText = [];
        this.hasFilters = false;
    }

    get filterTextString () {
        let filterTextString      = '';
        let filterTextStringArray = [];

        _forOwn(this.filterText, (value) => {
            filterTextStringArray.push(value);
        });

        if (filterTextStringArray.length > 0) {
            filterTextString = ` - Filtered By: ${filterTextStringArray.join(' | ')}`;
        }

        this.hasFilters = filterTextString.length > 0;

        return filterTextString;
    }

    search () {
        let searchParams = {};

        this
            .filters
            .forEach((filter) => {
                let filterData = filter.serialize();

                if (filterData) {
                    Object.assign(searchParams, filterData.param);
                }
            });

        this
            .$state
            .go(this.STATE_NAME.TEMPLATE_LIBRARY_SEARCH, searchParams, {inherit : false});
    }

    reset () {
        this
            .filters
            .forEach((filter) => {
                filter.reset();
            });
    }

    clear () {
        this
            .$state
            .go(this.$state.current.name, {}, {inherit : false});
    }

    registerFilter (filter) {
        this
            .filters
            .push(filter);

        let filterData = filter.serialize();

        if (filterData) {
            this.filterText[filterData.filterKey] = filterData.filterName;
        }
    }
}

export default HousePlansSearchController;
