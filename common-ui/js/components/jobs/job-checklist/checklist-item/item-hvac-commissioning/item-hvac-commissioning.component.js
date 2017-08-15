import template from './item-hvac-commissioning.html';
import controller from './item-hvac-commissioning.controller';
// import './job.scss';

let checklistItemHVACCommissioningComponent = {
    bindings : {
        itemId               : '@',
        itemCategory         : '@',
        itemCategoryProgress : '@'
    },
    template,
    controller,
    controllerAs : 'checklistItemHVACCommissioningCtrl'
};

export default checklistItemHVACCommissioningComponent;
