//TODO Consider moving this to a config.
const MAX_PAGES_TO_SHOW = 5;

class paginationController {
    constructor ($state, $stateParams, UI_ENUMS, PAGINATION) {
        'ngInject';

        this.$state       = $state;
        this.$stateParams = $stateParams;

        this.STATE_NAME   = UI_ENUMS.STATE_NAME;
        this.PAGE_PARAM   = UI_ENUMS.SEARCH_PARAMS.PAGE;
        this.PAGE_SIZE    = PAGINATION.PAGE_SIZE;
    }

    $onInit () {
        const page = parseInt(this.$stateParams[this.PAGE_PARAM], 10);
        this.numberOfPages = Math.ceil(this.quantity / this.PAGE_SIZE);
        this.currentPage   = page === 0 || page === '' || page === undefined ? 1 : page;
        if (this.currentPage !== 1) {
            this.setPage(this.currentPage);
        }
        this.pages         = this.getPageArray();
        this.previousPage  = Math.max(1, this.currentPage - 1);
        this.nextPage      = Math.min(this.numberOfPages, this.currentPage + 1);
    }

    setPage (page) {
        // page is set to 0 on quantity change, check for this and set to 1 if so.
        this.currentPage   = (page === 0) || isNaN(page) ? 1 : page;
        this.previousPage  = Math.max(1, this.currentPage - 1);
        this.nextPage      = Math.min(this.numberOfPages, this.currentPage + 1);

        this.pages         = this.getPageArray();

        // this.$stateParams[this.PAGE_PARAM] = page;
        this.onSetPage({
            page : this.currentPage
        });
        this.$state
            .go(
                this.STATE_NAME.JOBS_SEARCH,
                {
                    page : this.currentPage,
                },
                {
                    reload         : false,
                    inherit        : false,
                    dynamic        : true,
                    reloadOnSearch : false
                }
            );
    }

    getPageArray () {
        // const pageQuantity = Math.min(MAX_PAGES_TO_SHOW, this.numberOfPages);
        let pageArray = [];

        if (this.numberOfPages <= MAX_PAGES_TO_SHOW) {
            let page;
            for (page = 1; page <= this.numberOfPages; page++) {
                pageArray.push(page);
            }
        } else {
            let page;
            let pageStart = this.getPageStart();

            for (page = pageStart; page < pageStart + MAX_PAGES_TO_SHOW; page++) {
                pageArray.push(page);
            }
        }

        return pageArray;
    }

    getPageStart () {
        const middlePage = Math.ceil(MAX_PAGES_TO_SHOW / 2);
        const pageDelta  = Math.floor(MAX_PAGES_TO_SHOW / 2);
        let pageStart;

        if (this.currentPage <= middlePage) {
            pageStart = 1;
        } else if (this.currentPage >= this.numberOfPages - pageDelta) {
            pageStart = this.numberOfPages - MAX_PAGES_TO_SHOW + 1;
        } else {
            pageStart = this.currentPage - pageDelta;
        }

        return pageStart;
    }

    $onChanges (changes) {
        if (!changes.quantity.isFirstChange() && changes.quantity) {
            this.quantity      = changes.quantity.currentValue;
            this.numberOfPages = Math.ceil(this.quantity / this.PAGE_SIZE);
            this.setPage(0);
        }
    }
}

export default paginationController;
