class jobChecklistNavController {
    constructor ($rootScope, $state, $transitions, UI_ENUMS) {
        'ngInject';

        this.$state       = $state;
        this.$transitions = $transitions;

        this.CATEGORIES   = UI_ENUMS.CATEGORIES;
        this.MESSAGING    = UI_ENUMS.MESSAGING;

        this.updateChecklistResponseTotalsListener = $rootScope.$on(this.MESSAGING.UPDATE_CHECKLIST_RESPONSE_TOTALS, (event, progress) => {
            this.progress = progress;
        });
    }

    $onInit () {
        this.setHidden();

        this.deregisterOnFinish = this.$transitions.onSuccess(
            {to : 'job-checklist.*'}, () => {
                this.setHidden();
            }
        );
    }

    setHidden () {
        if (this.$state.current.name === 'job-checklist.stage') {
            this.hide = true;
        } else {
            this.hide = false;
        }
    }

    $onDestroy () {
        this.updateChecklistResponseTotalsListener();
        this.deregisterOnFinish();
    }
}

export default jobChecklistNavController;
