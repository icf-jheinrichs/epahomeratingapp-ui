import template from './item-static-pressure.html';
import controller from './item-static-pressure.controller';
// import './job.scss';

let checklistItemMrfStaticPressureComponent = {
    bindings : {
        itemId               : '@',
        itemCategory         : '@',
        itemCategoryProgress : '@',
        checklistItem        : '<',
        response             : '<',
        comments             : '<',
        homePerformance      : '<'
    },
    template,
    controller,
    controllerAs : 'checklistItemCtrl'
};

export default checklistItemMrfStaticPressureComponent;
