import template from './search-filter-keywords.html';
import controller from './search-filter-keywords.controller';

let searchFilterKeywordsComponent = {
    bindings : {
        registerFilter : '&'
    },
    template,
    controller,
    controllerAs : 'searchFilterKeywordsCtrl'
};

export default searchFilterKeywordsComponent;
