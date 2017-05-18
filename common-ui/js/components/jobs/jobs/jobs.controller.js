class JobsController {
    constructor (CONTEXT, UI_ENUMS) {
        'ngInject';

        this.CONTEXT_IS_APP = CONTEXT === UI_ENUMS.CONTEXT.APP;
    }

    $onInit () {
        this.filterCriteria = 'Jobs';
    }
}

export default JobsController;
