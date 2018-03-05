import template from './house-plans-search-page.html';
import controller from './house-plans-search-page.controller';

let housePlansSearchPageComponent = {
    bindings : {
        housePlans : '<'
    },
    template,
    controller,
    controllerAs : 'housePlansSearchPageCtrl'
};

export default housePlansSearchPageComponent;
