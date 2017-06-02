class MrfEditFieldBooleanController {
    constructor () {
        'ngInject';
    }

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
