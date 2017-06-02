import _forOwn from 'lodash/forOwn';
import _size from 'lodash/size';

const MAX_SIZE   = 4;
const MAX_LENGTH = 35;

class MrfEditFieldEnumController {
    constructor (DisplayLogicDigestService) {
        'ngInject';

        this.DisplayLogicDigestService = DisplayLogicDigestService;
    }

    $onInit () {
        this.DisplayLogicDigestService
            .getEnum(this.enumName)
            .then((ENUM) => {
                this.configureDisplay(ENUM);
            })
            .catch((error) => {
                this.enumNotFound = true;
            });
    }

    calculateEnumLength (ENUM) {
        let enumLength = 0;

        _forOwn(ENUM, (value, key) => {
            enumLength += value.length;
        });

        return enumLength;
    }

    configureDisplay (ENUM) {
        const enumSize    = (_size(ENUM) < MAX_SIZE);
        const enumLength  = (_size(ENUM) < MAX_SIZE) ? this.calculateEnumLength(ENUM) : MAX_LENGTH + 1;
        this.enumNotFound = false;

        if (enumSize < MAX_SIZE && enumLength <= MAX_LENGTH) {
            this.displayType = 'toggle';
            this.selected    = [this.value];
            this.buttons     = [];

            _forOwn(ENUM, (value, key) => {
                this.buttons.push({
                    Name  : value,
                    Key   : value
                });
            });
        } else {
            this.displayType = 'select';
            this.selected    = this.value;
            this.options     = ENUM;
        }
    }

    onSelect () {
        this.value = this.selected;
    }

    onToggle (response) {
        this.value = response[0];
    }
}

export default MrfEditFieldEnumController;
