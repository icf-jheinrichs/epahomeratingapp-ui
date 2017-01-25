import template from './house-plans-page.html';
import controller from './house-plans-page.controller';

let housePlansPageComponent = {
    bindings : {
        housePlans : '<'
    },
    template,
    controller,
    controllerAs : 'housePlansPageCtrl'
};

export default housePlansPageComponent;
