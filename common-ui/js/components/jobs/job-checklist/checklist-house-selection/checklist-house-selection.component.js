import template from './checklist-house-selection.html';
import controller from './checklist-house-selection.controller';

import './checklist-house-selection.scss';

let checklistHouseSelectionComponent = {
    bindings : {
        houses             : '<'
    },
    template,
    controller,
    controllerAs : 'checklistHouseSelectionCtrl'
};

export default checklistHouseSelectionComponent;
