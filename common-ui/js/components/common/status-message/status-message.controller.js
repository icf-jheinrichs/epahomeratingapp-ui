import _isEmpty from 'lodash/isEmpty';

class statusMessageController {
    constructor () {
        'ngInject';
    }

    $onInit () {
        this.setVisibility();
    }

    $onChanges (delta) {
        this.status = delta.status.currentValue;
        this.setVisibility();
    }

    onDismiss () {
        this.status = {};
        this.setVisibility();
    }

    getTypeClass () {
        let typeClass = (this.isVisible) ? `status-${this.status.type}` : '';
        return typeClass;
    }

    setVisibility () {
        this.isVisible = !_isEmpty(this.status);
    }
}

export default statusMessageController;
