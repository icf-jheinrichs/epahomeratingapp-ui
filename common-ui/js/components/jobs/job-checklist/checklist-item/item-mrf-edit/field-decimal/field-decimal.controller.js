class MrfEditFieldDecimalController {
    constructor (DisplayLogicDigestService) {
        'ngInject';

        this.DisplayLogicDigestService = DisplayLogicDigestService;
    }

    $onInit () {
        this.value = parseFloat(this.value);

        this.DisplayLogicDigestService
            .getDecimal(this.decimalName)
            .then((decimal) => {
                this.configureValidation(decimal);
                this.decimalFound = true;
            })
            .catch((error) => {
                this.decimalFound = false;
            });
    }

    configureValidation (decimal) {
        this.decimalType = decimal;

        this.errorMessages = {
            overMax  : `Please enter a value less than ${decimal.maxInclusive}`,
            underMin : `Please enter a value more than ${decimal.minInclusive}`,
            notValid : 'Please enter a valid number'
        };
    }

    setPrecision () {
        if (this.decimalFound) {
            // this.value = this.value.toPrecision(this.decimalType.fractionDigits + 1);
        }
    }
}

export default MrfEditFieldDecimalController;
