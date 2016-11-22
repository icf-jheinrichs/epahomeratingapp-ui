class epahomeratingappController {
    constructor ($rootScope, DisplayLogicDigestService, MESSAGING) {
        'ngInject';

        this.DisplayLogicDigestService = DisplayLogicDigestService;
        this.MESSAGING                 = MESSAGING;

        this.paddingTop    = 0;
        this.paddingBottom = 0;

        this.topPadListener = $rootScope.$on(this.MESSAGING.SET_TOP_PAD, (event, topPad) => {
            this.paddingTop = `${topPad}px`;

            return topPad;
        });

        this.bottomPadListener = $rootScope.$on(this.MESSAGING.SET_BOTTOM_PAD, (event, bottomPad) => {
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
