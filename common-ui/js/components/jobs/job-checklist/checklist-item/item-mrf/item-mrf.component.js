import template from './item-mrf.html';
import controller from './item-mrf.controller';
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
