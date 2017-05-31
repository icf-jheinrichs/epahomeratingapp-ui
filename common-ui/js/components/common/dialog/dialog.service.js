class DialogService {
    constructor ($log, $q) {
        'ngInject';

        this.$log           = $log;
        this.$q             = $q;
        this.dialogs        = {};
    }

    registerDialog (dialog) {
        this.dialogs[dialog.id] = dialog;
    }

    deregisterDialog (dialogId) {
        if (this.dialogs[dialogId]) {
            delete this.dialogs[dialogId];
        }
    }

    openDialog (dialogId) {
        return this.$q((resolve, reject) => {
            if (this.dialogs[dialogId]) {
                this.dialogs[dialogId].open({
                    resolve,
                    reject
                });
            } else {
                reject('dialog not registered');
            }
        });
    }
}

export default DialogService;
