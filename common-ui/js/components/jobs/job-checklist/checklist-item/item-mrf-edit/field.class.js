class MrfEditField {
    constructor (DisplayLogicDigestService) {
        'ngInject';

        this.DisplayLogicDigestService = DisplayLogicDigestService;
    }

    onChange (value) {
        if (this.handleChange) {
            this.handleChange ({
                value
            });
        }
    }
}

export default MrfEditField;
