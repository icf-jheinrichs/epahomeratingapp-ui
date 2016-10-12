import template from './linear-progress.html';
import controller from './linear-progress.controller';
import './linear-progress.scss';

let linearProgressComponent = {
    bindings : {
        verified    : '@',
        mustCorrect : '@',
        total       : '@'
    },
    template,
    controller,
    controllerAs : 'linearProgressCtrl'
};

export default linearProgressComponent;
