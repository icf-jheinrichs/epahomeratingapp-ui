import MrfEditField from '../field.class.js';

class MrfEditFieldDecimalController extends MrfEditField {
    $onInit () {
        this.value   = parseFloat(this.value);
        this.invalid = false;

        this.DisplayLogicDigestService
            .getDecimal(this.field.DataType.Name)
            .then((decimal) => {
                this.configureValidation(decimal);
                this.decimalFound = true;
            })
            .catch((error) => {
                this.decimalFound = false;
            });

        this.disabled = this.disabled || false;
    }

    configureValidation (decimal) {
        this.decimalType = decimal;

        this.decimalType.step            = this.setStep();
        this.decimalType.roundMultiplier = this.setRoundMultiplier();

        this.errorMessages = {
            overMax  : `Please enter a value no larger than ${decimal.maxInclusive}.`,
            underMin : `Please enter a value that's at least ${decimal.minInclusive}.`,
            notValid : 'Please enter a valid number.'
        };
    }

    $onChanges (changes) {
        if (!changes.disabled.isFirstChange()) {
            this.disabled = changes.disabled.currentValue;
        }
    }

    validate () {
        if (!this.decimalFound) {
            return;
        }

        if (this.value > this.decimalType.maxInclusive) {
            this.errorMessage = this.errorMessages.overMax;
            this.invalid      = true;
        } else if (this.value < this.decimalType.minInclusive) {
            this.errorMessage = this.errorMessages.underMin;
            this.invalid      = true;
        } else if (this.value === undefined) {
            this.errorMessage = this.errorMessages.notValid;
            this.invalid      = true;
        } else {
            this.value = this.setPrecision();
            this.onChange(this.value);
            this.errorMessage = '';
            this.invalid      = false;
        }

        this.model.$setValidity('isValidDecimal', !this.invalid);
    }

    setStep () {
        let step  = 1;
        let index = this.decimalType.fractionDigits;

        while (index) {
            step = step / 10;

            index -= 1;
        }

        return step.toString();
    }

    setRoundMultiplier () {
        let roundMultiplier  = 1;
        let index            = this.decimalType.fractionDigits;

        while (index) {
            roundMultiplier = roundMultiplier * 10;

            index -= 1;
        }

        return roundMultiplier;
    }

    setPrecision () {
        if (this.value === null) {
            return this.value;
        }

        let decimal   = this.value.toString().split('.')[1];
        let precision = (decimal) ? decimal.length : 0;
        let value     = this.value;

        if (precision > this.decimalType.fractionDigits) {
            value = Math.round(value * this.decimalType.roundMultiplier) / this.decimalType.roundMultiplier;
        }

        return value;
    }
}

export default MrfEditFieldDecimalController;
