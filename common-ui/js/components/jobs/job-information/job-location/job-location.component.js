import template from './job-location.html';
import controller from './job-location.controller';
import './job-location.scss';

let jobLocationComponent = {
    bindings : {
      house                 : '<',
      onUpdateHousePhoto    : '&',
      sampleSet             : '<',
      ratingType            : '<'
    },
    template,
    controller,
    controllerAs : 'jobLocationCtrl'
};

export default jobLocationComponent;
