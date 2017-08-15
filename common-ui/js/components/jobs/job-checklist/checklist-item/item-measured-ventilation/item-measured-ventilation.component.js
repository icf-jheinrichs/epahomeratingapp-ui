import template from './item-measured-ventilation.html';
import controller from './item-measured-ventilation.controller';
// import './job.scss';

let checklistItemMrfComponent = {
    bindings : {
        itemId               : '@',
        itemCategory         : '@',
        itemCategoryProgress : '@'
    },
    template,
    controller,
    controllerAs : 'checklistItemCtrl'
};

export default checklistItemMrfComponent;
