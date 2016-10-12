import template from './house-selection-item.html';
import controller from './house-selection-item.controller';

import './house-selection-item.scss';

let houseSelectionItemComponent = {
    bindings : {
        house     : '<',
        isPrimary : '@'
    },
    template,
    controller,
    controllerAs : 'houseSelectionItemCtrl'
};

export default houseSelectionItemComponent;
