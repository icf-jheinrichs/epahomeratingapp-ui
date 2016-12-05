import _indexOf from 'lodash/indexOf';
import _union from 'lodash/union';
import _without from 'lodash/without';

class ButtonGroupController {
    constructor ($log) {
        'ngInject';

        this.$log = $log;
    }

    $onInit () {
        this.selected = this.initialValue || [];
    }

    handleClick (buttonValue) {
        if (this.isActive(buttonValue)) {
            this.selected  = _without(this.selected, buttonValue);
        } else if (this.allowMultiple) {
            this.selected  = _union(this.selected, [buttonValue]);
        } else {
            this.selected = [buttonValue];
        }

        this.onSetValue({response : this.selected});
    }

    isActive (buttonValue) {
        return _indexOf(this.selected, buttonValue) >= 0;
    }
}

export default ButtonGroupController;
