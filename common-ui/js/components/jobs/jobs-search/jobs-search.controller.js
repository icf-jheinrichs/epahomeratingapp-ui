import _forOwn from 'lodash/forOwn';
import _find from 'lodash/find';

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
        // Add status name to filter text (e.g. active, complete, submitted to provider)
        if (this.$stateParams[this.SEARCH_PARAMS.STATUS]) {
            let jobProgressObject;
            let jobStatus = decodeURIComponent(this.$stateParams[this.SEARCH_PARAMS.STATUS]);

            jobProgressObject = _find(this.JOB_PROGRESS, (progress) => {
                return progress.Key === jobStatus;
            });

            this.filterText[jobStatus] = jobProgressObject.Name;
        }

        // Add progress level to filter text (pre-drywall or final)
        if (this.$stateParams[this.SEARCH_PARAMS.PROGRESS_LEVEL]) {
            let categoryProgressObject;

            categoryProgressObject = _find(this.CATEGORY_PROGRESS, (progress) => {
                return progress.Key === this.$stateParams[this.SEARCH_PARAMS.PROGRESS_LEVEL];
            });

            this.filterText[this.SEARCH_PARAMS.PROGRESS_LEVEL] = categoryProgressObject.Name;
        }

        // Add offline status to filter text (pre-drywall or final)
        if (this.$stateParams[this.SEARCH_PARAMS.AVAILABLE_OFFLINE]) {
            this.filterText[this.SEARCH_PARAMS.AVAILABLE_OFFLINE] = 'Available Offline';
        }

        // Add internal review to filter text (pre-drywall or final)
        if (this.$stateParams[this.SEARCH_PARAMS.INTERNAL_REVIEW]) {
            this.filterText[this.SEARCH_PARAMS.INTERNAL_REVIEW] = 'Internal Review';
        }

        this.subPanelActive = false;
    }

    get filterTextString () {
        let filterTextString = [];

        _forOwn(this.filterText, (value) => {
            filterTextString.push(value);
        });

        return filterTextString.join(', ');
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
            let status                        = {};
            status[this.SEARCH_PARAMS.STATUS] = this.$stateParams[this.SEARCH_PARAMS.STATUS];

            Object.assign(searchParams, status);
        }

        if (this.$stateParams[this.SEARCH_PARAMS.PROGRESS_LEVEL]) {
            let progressLevel                                = {};
            progressLevel[this.SEARCH_PARAMS.PROGRESS_LEVEL] = this.$stateParams[this.SEARCH_PARAMS.PROGRESS_LEVEL];

            Object.assign(searchParams, progressLevel);
        }

        if (this.$stateParams[this.SEARCH_PARAMS.AVAILABLE_OFFLINE]) {
            let availableOffline                                   = {};
            availableOffline[this.SEARCH_PARAMS.AVAILABLE_OFFLINE] = this.$stateParams[this.SEARCH_PARAMS.AVAILABLE_OFFLINE];

            Object.assign(searchParams, availableOffline);
        }

        if (this.$stateParams[this.SEARCH_PARAMS.INTERNAL_REVIEW]) {
            let internalReview                                 = {};
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
