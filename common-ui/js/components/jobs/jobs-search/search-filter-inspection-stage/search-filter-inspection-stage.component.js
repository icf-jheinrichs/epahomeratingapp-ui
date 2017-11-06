import template from './search-filter-inspection-stage.html';
import controller from './search-filter-inspection-stage.controller';

let searchFilterInspectionStageComponent = {
    bindings : {
        registerFilter : '&'
    },
    template,
    controller,
    controllerAs : 'searchFilterInspectionStageCtrl'
};

export default searchFilterInspectionStageComponent;
