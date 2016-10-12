class epahomeratingappController {
    constructor ($rootScope, DisplayLogicDigestService) {
        'ngInject';

        this.paddingTop = 0;
        this.paddingBottom = 0;

        $rootScope.$on('setBottomPad', (event, bottomPad) => {
            this.paddingBottom = `${bottomPad}px`;

            return bottomPad;
        });

        // $rootScope.$on('setTopPad', function onSetTopPad (topPad) {
        //     this.paddingTop = `${topPad}px`;
        // });
    }
}

export default epahomeratingappController;
