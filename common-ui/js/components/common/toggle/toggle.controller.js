class ToggleController {
    constructor ($log, DialogService) {
        'ngInject';

        this.$log          = $log;

        this.DialogService = DialogService;
    }

    $onInit () {
        this.toggleId = this.toggleId || 'toggle';

        this.confirmToggleOff = this.toggleConfirmationDialog && this.toggleConfirmationDialog.length > 0;
    }

    $onChanges (changes) {
        if (changes.toggleClass && !changes.toggleClass.isFirstChange()) {
            this.toggleClass = changes.toggleClass.currentValue;
        }
    }

    onChange () {
        if (this.toggleValue === false && this.confirmToggleOff) {
            this.DialogService
                .openDialog(this.toggleConfirmationDialog)
                .then((confirmed) => {
                    if (confirmed) {
                        this.handleChange({
                            isOn : this.toggleValue
                        });
                    } else {
                        this.toggleValue = true;
                    }
                })
                .catch((message) => {
                    this.$log.log(message);
                });
        } else {
            this.handleChange({
                isOn : this.toggleValue
            });
        }
    }
}

export default ToggleController;
