import _forOwn from 'lodash/forOwn';

class JobsSearchBarController {
    constructor ($state, $stateParams, CONTEXT, UI_ENUMS) {
        'ngInject';

        this.$state       = $state;
        this.$stateParams = $stateParams;

        this.CONTEXT_IS_APP    = CONTEXT === UI_ENUMS.CONTEXT.APP;
        this.SEARCH_PARAMS     = UI_ENUMS.SEARCH_PARAMS;
        this.JOB_PROGRESS      = UI_ENUMS.JOB_PROGRESS;
        this.CATEGORY_PROGRESS = UI_ENUMS.CATEGORY_PROGRESS;
        this.STATE_NAME        = UI_ENUMS.STATE_NAME;

        this.filters = [];
        this.filterText = [];
    }

    $onInit () {
        this.subPanelActive = false;

        this.hasFilters     = false;
    }

    get filterTextString () {
        let filterTextString      = '';
        let filterTextStringArray = [];

        _forOwn(this.filterText, (value) => {
            filterTextStringArray.push(`<span class="label label-default">${value}</span>`);
        });

        if (filterTextStringArray.length > 0) {
            filterTextString = ` - Filtered By: ${filterTextStringArray.join(' ')}`;
        }

        this.hasFilters = filterTextString.length > 0;

        return filterTextString;
    }

    clear () {
        let searchParams = {};

        if (this.$stateParams[this.SEARCH_PARAMS.INTERNAL_REVIEW]) {
            let internalReview = {};
            internalReview[this.SEARCH_PARAMS.INTERNAL_REVIEW] = this.$stateParams[this.SEARCH_PARAMS.INTERNAL_REVIEW];

            Object.assign(searchParams, internalReview);
        }

        if (this.$stateParams[this.SEARCH_PARAMS.STATUS]) {
            let status = {};
            status[this.SEARCH_PARAMS.STATUS] = this.$stateParams[this.SEARCH_PARAMS.STATUS];

            Object.assign(searchParams, status);
        }

        if (this.$stateParams[this.SEARCH_PARAMS.PROGRESS_LEVEL]) {
            let progressLevel = {};
            progressLevel[this.SEARCH_PARAMS.PROGRESS_LEVEL] = this.$stateParams[this.SEARCH_PARAMS.PROGRESS_LEVEL];

            Object.assign(searchParams, progressLevel);
        }

        if (this.$stateParams[this.SEARCH_PARAMS.RATER]) {
            let rater = {};
            rater[this.SEARCH_PARAMS.RATER] = this.$stateParams[this.SEARCH_PARAMS.RATER];

            Object.assign(searchParams, rater);
        }

        this
            .$state
            .go(this.$state.current.name, searchParams, {inherit : false});
    }

    search () {
        let searchParams = {};
        let searchState;

        if (this.$state.current.name === this.STATE_NAME.JOBS || this.$state.current.name === this.STATE_NAME.JOBS_SEARCH) {
            searchState = this.STATE_NAME.JOBS_SEARCH;
        } else if (this.$state.current.name === this.STATE_NAME.JOBS_PROVIDER || this.$state.current.name === this.STATE_NAME.JOBS_PROVIDER_SEARCH) {
            searchState = this.STATE_NAME.JOBS_PROVIDER_SEARCH;
        }

        this
            .filters
            .forEach((filter) => {
                let filterData = filter.serialize();

                if (filterData) {
                    Object.assign(searchParams, filterData.param);
                }
            });

        if (this.$stateParams[this.SEARCH_PARAMS.STATUS]) {
            let status = {};
            status[this.SEARCH_PARAMS.STATUS] = this.$stateParams[this.SEARCH_PARAMS.STATUS];

            Object.assign(searchParams, status);
        }

        if (this.$stateParams[this.SEARCH_PARAMS.PROGRESS_LEVEL]) {
            let progressLevel = {};
            progressLevel[this.SEARCH_PARAMS.PROGRESS_LEVEL] = this.$stateParams[this.SEARCH_PARAMS.PROGRESS_LEVEL];

            Object.assign(searchParams, progressLevel);
        }

        if (this.$stateParams[this.SEARCH_PARAMS.AVAILABLE_OFFLINE]) {
            let availableOffline = {};
            availableOffline[this.SEARCH_PARAMS.AVAILABLE_OFFLINE] = this.$stateParams[this.SEARCH_PARAMS.AVAILABLE_OFFLINE];

            Object.assign(searchParams, availableOffline);
        }

        if (this.$stateParams[this.SEARCH_PARAMS.INTERNAL_REVIEW]) {
            let internalReview = {};
            internalReview[this.SEARCH_PARAMS.INTERNAL_REVIEW] = this.$stateParams[this.SEARCH_PARAMS.INTERNAL_REVIEW];

            Object.assign(searchParams, internalReview);
        }

        if (this.$stateParams[this.SEARCH_PARAMS.RATER]) {
            let rater = {};
            rater[this.SEARCH_PARAMS.RATER] = this.$stateParams[this.SEARCH_PARAMS.RATER];

            Object.assign(searchParams, rater);
        }

        if (this.$stateParams[this.SEARCH_PARAMS.INTERNAL_REVIEW]) {
            let internalReview = {};
            internalReview[this.SEARCH_PARAMS.INTERNAL_REVIEW] = this.$stateParams[this.SEARCH_PARAMS.INTERNAL_REVIEW];

            Object.assign(searchParams, internalReview);
        }

        this
            .$state
            .go(searchState, searchParams, {inherit : false});
    }

    showSubPanel (show) {
        this.subPanelActive = show;
    }

    reset () {
        this
            .filters
            .forEach((filter) => {
                filter.reset();
            });
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

export default JobsSearchBarController;
