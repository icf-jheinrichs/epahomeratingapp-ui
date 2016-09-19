import template from './item-default.html';
import controller from './item-default.controller';
// import './job.scss';

let checklistItemDefaultComponent = {
    bindings : {
        checklistItem : '<'
    },
    template,
    controller,
    controllerAs : 'checklistItemCtrl'
};

export default checklistItemDefaultComponent;
