class jobChecklistNavController {
    constructor ($rootScope, UI_ENUMS) {
        'ngInject';

        this.CATEGORIES = UI_ENUMS.CATEGORIES;
        this.MESSAGING  = UI_ENUMS.MESSAGING;

        this.updateChecklistResponseTotalsListener = $rootScope.$on(this.MESSAGING.UPDATE_CHECKLIST_RESPONSE_TOTALS, (event, progress) => {
            this.progress = progress;
        });
    }

    $onDestroy () {
        this.updateChecklistResponseTotalsListener();
    }
}

export default jobChecklistNavController;
