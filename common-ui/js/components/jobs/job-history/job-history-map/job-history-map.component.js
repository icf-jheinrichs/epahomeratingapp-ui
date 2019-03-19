import template from './job-history-map.html';
import controller from './job-history-map.controller';

let jobHistoryMapComponent = {
    bindings : {
        map : '<'
    },
    template,
    controller,
    controllerAs : 'jobHistoryMapCtrl'
};

export default jobHistoryMapComponent;
