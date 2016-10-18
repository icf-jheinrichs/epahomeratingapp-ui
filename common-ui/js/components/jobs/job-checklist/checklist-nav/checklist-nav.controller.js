class jobChecklistNavController {
    constructor ($rootScope, CATEGORIES) {
        'ngInject';

        this.CATEGORIES = CATEGORIES;

        $rootScope.$on('updateChecklistResponseTotals', (event, progress) => {
            this.progress = progress;
        });
    }
}

export default jobChecklistNavController;
