import template from './house-plans-page.html';
import controller from './house-plans-page.controller';

import './house-plans.scss';

let housePlansPageComponent = {
    bindings : {
        housePlans : '<'
    },
    template,
    controller,
    controllerAs : 'housePlansPageCtrl'
};

export default housePlansPageComponent;
