//TODO Consider moving this to a config.
const MAX_PAGES_TO_SHOW = 5;

class paginationController {
    constructor ($state, $stateParams, UI_ENUMS, PAGINATION) {
        'ngInject';

        this.$state       = $state;
        this.$stateParams = $stateParams;

        this.PAGE_PARAM   = UI_ENUMS.SEARCH_PARAMS.PAGE;
        this.PAGE_SIZE    = PAGINATION.PAGE_SIZE;
    }

    $onInit () {
        this.numberOfPages = Math.ceil(this.quantity / this.PAGE_SIZE);
        this.currentPage   = 1;
        this.pages         = this.getPageArray();
        this.previousPage  = Math.max(1, this.currentPage - 1);
        this.nextPage      = Math.min(this.numberOfPages, this.currentPage + 1);
    }

    setPage (page) {
        if (this.currentPage === page) {
            return;
        }

        this.currentPage   = page;
        this.previousPage  = Math.max(1, this.currentPage - 1);
        this.nextPage      = Math.min(this.numberOfPages, this.currentPage + 1);

        this.pages         = this.getPageArray();

        this.onSetPage({
            page
        });
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
}

export default paginationController;
