import template from './house-plans-search.html';
import controller from './house-plans-search.controller';

//TODO DRY this with the jobs search
import './house-plans-search.scss';

let housePlansSearchComponent = {
    bindings : {
        quantity : '<'
    },
    template,
    controller,
    controllerAs : 'housePlansSearchCtrl'
};

export default housePlansSearchComponent;
