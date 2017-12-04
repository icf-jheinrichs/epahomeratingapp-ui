import template from './search-filter-internal-review.html';
import controller from './search-filter-internal-review.controller';

let searchFilterInternalReviewComponent = {
    bindings : {
        registerFilter : '&'
    },
    template,
    controller,
    controllerAs : 'searchFilterInternalReviewCtrl'
};

export default searchFilterInternalReviewComponent;
