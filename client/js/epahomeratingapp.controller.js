class epahomeratingappController {
    constructor ($rootScope, DisplayLogicDigestService) {
        'ngInject';

        this.paddingTop = 0;
        this.paddingBottom = 0;

        $rootScope.$on('setBottomPad', (event, bottomPad) => {
            this.paddingBottom = `${bottomPad}px`;

            return bottomPad;
        });

        $rootScope.$on('setTopPad', (event, topPad) => {
            this.paddingTop = `${topPad}px`;

            return topPad;
        });
    }
}

export default epahomeratingappController;
