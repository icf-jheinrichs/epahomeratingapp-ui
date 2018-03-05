class HousePlansPageController {
    constructor () {
        'ngInject';
    }

    $onInit () {
        //TODO: put all this modal stuff in directive
        this.showHousePlanEditModal = false;
        this.showHousePlanNewModal  = false;
    }

    //TODO: put all this modal stuff in directive
    showModal (modal) {
        this[modal] = true;
    }

    //TODO: put all this modal stuff in directive
    hideModal (modal) {
        this[modal] = false;
    }

    //TODO: put all this modal stuff in directive
    toggleModal (modal) {
        this[modal] = !this[modal];
    }
}

export default HousePlansPageController;
