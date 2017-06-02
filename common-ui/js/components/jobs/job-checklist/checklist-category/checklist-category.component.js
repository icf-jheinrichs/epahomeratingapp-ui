import template from './checklist-category.html';
import controller from './checklist-category.controller';

let jobChecklistCategoryComponent = {
    bindings : {
        jobDisplayList    : '<',
        jobChecklistState : '<',
        jobDataResponse   : '<'
    },
    template,
    controller,
    controllerAs : 'jobChecklistCategoryCtrl'
};

export default jobChecklistCategoryComponent;
