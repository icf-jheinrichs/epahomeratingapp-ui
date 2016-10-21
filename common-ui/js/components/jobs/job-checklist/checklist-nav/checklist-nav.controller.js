class jobChecklistNavController {
    constructor ($rootScope, CATEGORIES) {
        'ngInject';

        this.CATEGORIES = CATEGORIES;

        this.updateChecklistResponseTotalsListener = $rootScope.$on('updateChecklistResponseTotals', (event, progress) => {
            this.progress = progress;
        });
    }

    $onDestroy () {
        this.updateChecklistResponseTotalsListener();
    }
}

export default jobChecklistNavController;
