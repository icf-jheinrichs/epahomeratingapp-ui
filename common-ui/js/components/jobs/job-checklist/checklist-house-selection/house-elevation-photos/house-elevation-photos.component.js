import template from './house-elevation-photos.html';
import controller from './house-elevation-photos.controller';

import './house-elevation-photos.scss';

let houseElevationPhotosComponent = {
    bindings : {
        elevationPhotosVisible : '=',
        photos                 : '<',
        onUpdateHousePhoto     : '&'
    },
    template,
    controller,
    controllerAs : 'houseElevationPhotosCtrl'
};

export default houseElevationPhotosComponent;
