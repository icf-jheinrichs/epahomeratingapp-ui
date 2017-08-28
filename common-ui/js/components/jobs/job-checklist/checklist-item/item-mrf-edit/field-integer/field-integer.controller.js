import MrfEditField from '../field.class.js';

class MrfEditFieldIntegerController extends MrfEditField {
    $onInit () {
        this.value   = parseInt(this.value, 10);
        this.invalid = false;

        this.DisplayLogicDigestService
            .getInteger(this.field.DataType.Name)
            .then((integer) => {
                this.configureValidation(integer);
                this.integerFound = true;
            })
            .catch((error) => {
                this.integerFound = false;
            });
    }

    configureValidation (integer) {
        this.integerType = integer;

        this.errorMessages = {
            overMax  : `Please enter a value no larger than ${integer.maxInclusive}.`,
            underMin : `Please enter a value that's at least ${integer.minInclusive}.`,
            notValid : 'Please enter a valid number.'
        };
    }

    validate () {
        if (!this.integerFound) {
            return;
        }

        if (this.value > this.integerType.maxInclusive) {
            this.errorMessage = this.errorMessages.overMax;
            this.invalid      = true;
        } else if (this.value < this.integerType.minInclusive) {
            this.errorMessage = this.errorMessages.underMin;
            this.invalid      = true;
        } else if (this.value === undefined) {
            this.errorMessage = this.errorMessages.notValid;
            this.invalid      = true;
        } else {
            this.value = this.setPrecision();
            this.errorMessage = '';
            this.invalid      = false;
        }

        this.model.$setValidity('isValidInteger', !this.invalid);
    }

    setPrecision () {
        if (this.value === null) {
            return this.value;
        }

        return Math.round(this.value);
    }
}

export default MrfEditFieldIntegerController;
