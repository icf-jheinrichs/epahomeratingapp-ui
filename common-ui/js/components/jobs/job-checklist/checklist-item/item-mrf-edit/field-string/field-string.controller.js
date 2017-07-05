class MrfEditFieldStringController {
    constructor (DisplayLogicDigestService) {
        'ngInject';

        this.DisplayLogicDigestService = DisplayLogicDigestService;
    }

    $onInit () {
        this.DisplayLogicDigestService
            .getString(this.stringName)
            .then((string) => {
                this.stringType = string;
                this.stringFound = true;
            })
            .catch((error) => {
                this.stringFound = false;
            });
    }
}

export default MrfEditFieldStringController;
