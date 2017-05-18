class ToggleController {
    constructor ($log) {
        'ngInject';

        this.$log = $log;
    }

    $onInit () {
        this.toggleId = this.toggleId || 'toggle';
    }

    $onChanges (changes) {
        if (changes.toggleClass && !changes.toggleClass.isFirstChange()) {
            this.toggleClass = changes.toggleClass.currentValue;
        }
    }

    onChange () {
        this.handleChange({
            isOn : this.toggleValue
        });
    }
}

export default ToggleController;
