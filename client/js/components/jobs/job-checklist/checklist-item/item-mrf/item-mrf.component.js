import template from './item-mrf.html';
import controller from './item-mrf.controller';
// import './job.scss';

let checklistItemMrfComponent = {
    bindings : {
        checklistItem : '<'
    },
    template,
    controller,
    controllerAs : 'checklistItemCtrl'
};

export default checklistItemMrfComponent;
