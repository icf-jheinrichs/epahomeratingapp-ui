class jobChecklistNavController {
    constructor ($rootScope, MESSAGING, CATEGORIES) {
        'ngInject';

        this.CATEGORIES = CATEGORIES;
        this.MESSAGING  = MESSAGING;

        this.updateChecklistResponseTotalsListener = $rootScope.$on(this.MESSAGING.UPDATE_CHECKLIST_RESPONSE_TOTALS, (event, progress) => {
            this.progress = progress;
        });
    }

    $onDestroy () {
        this.updateChecklistResponseTotalsListener();
    }
}

export default jobChecklistNavController;
