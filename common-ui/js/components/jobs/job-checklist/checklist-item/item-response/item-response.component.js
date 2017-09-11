import template from './item-response.html';
import controller from './item-response.controller';
// import './job.scss';

let checklistItemResponseComponent = {
    bindings : {
        response        : '<',
        responseHouseId : '<',
        editResponse    : '&'
    },
    template,
    controller,
    controllerAs : 'checklistItemResponseCtrl'
};

export default checklistItemResponseComponent;
