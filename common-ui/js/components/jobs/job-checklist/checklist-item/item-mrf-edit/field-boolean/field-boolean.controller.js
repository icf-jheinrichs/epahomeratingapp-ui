import MrfEditField from '../field.class.js';

class MrfEditFieldBooleanController extends MrfEditField {
    $onInit () {
        this.buttons = [
            {
                'Name'  : 'True',
                'Key'   : 'true'
            },
            {
                'Name'  : 'False',
                'Key'   : 'false'
            }
        ];

        this.selected = this.value !== undefined ? [this.value.toString()] : [];
    }

    onSetResponse (response) {
        this.value = response[0];
        this.onChange(this.value);
        this.selected = response;
    }

    /**
     * Used in item-mrf-edit-duct-system. If user cancels Leakage Test Exemption? dialog, will set value back to false.
     * @return {[type]} [description]
     */
    $doCheck () {
        if (this.value === 'false' && this.selected[0] !== 'false') {
            this.selected = ['false'];
        }
    }
}

export default MrfEditFieldBooleanController;
