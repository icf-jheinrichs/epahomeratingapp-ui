class jobChecklistNavController {
    constructor ($rootScope, CATEGORIES) {
        this.CATEGORIES = CATEGORIES;

        $rootScope.$on('updateChecklistResponseTotals', (event, progress) => {
            this.progress = progress;
        });
    }
}

export default jobChecklistNavController;
