class ModalService {
    constructor ($log, $q) {
        'ngInject';

        this.$log           = $log;
        this.$q             = $q;
        this.modals        = {};
    }

    registerModal (modal) {
        this.modals[modal.id] = modal;
    }

    deregisterModal (modalId) {
        if (this.modals[modalId]) {
            delete this.modals[modalId];
        }
    }

    openModal (modalId) {
        return this.$q((resolve, reject) => {
            if (this.modals[modalId]) {
                this.modals[modalId].open({
                    resolve,
                    reject
                });
            } else {
                reject(`modal ${modalId} not registered`);
            }
        });
    }

    closeModal (modalId) {
        if (this.modals[modalId]) {
            this.modals[modalId].close();
        }
    }
}

export default ModalService;
