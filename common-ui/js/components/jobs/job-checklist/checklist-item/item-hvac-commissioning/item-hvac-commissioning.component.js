import template from './item-hvac-commissioning.html';
import controller from './item-hvac-commissioning.controller';
// import './job.scss';

let checklistItemHVACCommissioningComponent = {
    bindings : {
        itemId               : '@',
        itemCategory         : '@',
        itemCategoryProgress : '@',
        checklistItem        : '<',
        response             : '<',
        itemData             : '<',
        comments             : '<',
        homePerformance      : '<'
    },
    template,
    controller,
    controllerAs : 'checklistItemHVACCommissioningCtrl'
};

export default checklistItemHVACCommissioningComponent;
