import template from './search-filter-rating-type.html';
import controller from './search-filter-rating-type.controller';

let searchFilterRatingTypeComponent = {
    bindings : {
        registerFilter : '&'
    },
    template,
    controller,
    controllerAs : 'searchFilterRatingTypeCtrl'
};

export default searchFilterRatingTypeComponent;
