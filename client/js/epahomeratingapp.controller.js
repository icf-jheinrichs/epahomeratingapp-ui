class epahomeratingappController {
    constructor ($rootScope, DisplayLogicDigestService, UI_ENUMS) {
        'ngInject';

        this.$rootScope    = $rootScope;

        this.DisplayLogicDigestService = DisplayLogicDigestService;
        this.MESSAGING                 = UI_ENUMS.MESSAGING;

        this.paddingTop    = 0;
        this.paddingBottom = 0;
    }

    $onInit () {
        this.topPadListener = this.$rootScope.$on(this.MESSAGING.SET_TOP_PAD, (event, topPad) => {
            this.paddingTop = `${topPad}px`;

            return topPad;
        });

        this.bottomPadListener = this.$rootScope.$on(this.MESSAGING.SET_BOTTOM_PAD, (event, bottomPad) => {
            this.paddingBottom = `${bottomPad}px`;

            return bottomPad;
        });
    }

    $onDestroy () {
        this.topPadListener();
        this.bottomPadListener();
    }
}

export default epahomeratingappController;
