import template from './radial-progress.html';
import controller from './radial-progress.controller.js';
import './radial-progress.scss';

let radialProgressComponent = {
    bindings : {
        progress : '<'
    },
    template,
    controller,
    controllerAs : 'radialProgressCtrl'
};

export default radialProgressComponent;
