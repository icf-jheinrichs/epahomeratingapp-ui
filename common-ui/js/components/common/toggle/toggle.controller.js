class ToggleController {
    constructor ($log, DialogService) {
        'ngInject';

        this.$log          = $log;

        this.DialogService = DialogService;
    }

    $onInit () {
        this.toggleId = this.toggleId || 'toggle';

        this.confirmToggleOff = this.toggleConfirmationDialog && this.toggleConfirmationDialog.length > 0;
        this.confirmDisabled  = this.toggleDisabledDialog && this.toggleDisabledDialog.length > 0;
    }

    $onChanges (changes) {
        if (changes.toggleClass && !changes.toggleClass.isFirstChange()) {
            this.toggleClass = changes.toggleClass.currentValue;
        }
    }

    onChange () {
        // dialog disabled has a higher priority than the confirm toggle off
        if (this.confirmDisabled) {
            this.DialogService
                .openDialog(this.toggleDisabledDialog)
                .then((confirmed) => {
                    if (confirmed) {
                        this.toggleValue = !this.toggleValue;
                    }
                })
                .catch((message) => {
                    this.$log.log(message);
                });
        } else if (this.toggleValue === false && this.confirmToggleOff) {
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
