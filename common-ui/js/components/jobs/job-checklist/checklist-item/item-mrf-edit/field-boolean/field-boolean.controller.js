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
    }
}

export default MrfEditFieldBooleanController;
