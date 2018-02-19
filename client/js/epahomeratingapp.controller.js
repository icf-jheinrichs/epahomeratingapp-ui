class epahomeratingappController {
    constructor ($timeout, $rootScope, DisplayLogicDigestService, UI_ENUMS) {
        'ngInject';

        this.$timeout      = $timeout;
        this.$rootScope    = $rootScope;

        this.DisplayLogicDigestService = DisplayLogicDigestService;
        this.MESSAGING                 = UI_ENUMS.MESSAGING;

        this.paddingTop    = `${45}px`;
        this.paddingBottom = '0px';
    }

    $onInit () {
        this.topPadListener = this.$rootScope.$on(this.MESSAGING.SET_TOP_PAD, (event, topPad) => {
            this.$timeout(() => {
                this.paddingTop = `${topPad}px`;
            });

            return topPad;
        });

        this.bottomPadListener = this.$rootScope.$on(this.MESSAGING.SET_BOTTOM_PAD, (event, bottomPad) => {
            this.$timeout(() => {
                this.paddingBottom = `${bottomPad}px`;
            });

            return bottomPad;
        });
    }

    $onDestroy () {
        this.topPadListener();
        this.bottomPadListener();
    }
}

export default epahomeratingappController;
