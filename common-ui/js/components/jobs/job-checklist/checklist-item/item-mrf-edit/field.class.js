class MrfEditField {
    constructor (DisplayLogicDigestService) {
        'ngInject';

        this.DisplayLogicDigestService = DisplayLogicDigestService;
    }

    handleKeypress (event) {
        if (event.key !== 'Enter') {
            return;
        }

        if (this.validate) {
            this.validate();
        }

        if (this.handleChange) {
            this.handleChange({
                value : this.value
            });
        }

        if (this.model.$invalid) {
            event.preventDefault();
        }
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
