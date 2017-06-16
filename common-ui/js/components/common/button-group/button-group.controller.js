import _indexOf from 'lodash/indexOf';
import _union from 'lodash/union';
import _without from 'lodash/without';

class ButtonGroupController {
    $onInit () {
        this.selected = this.initialValue || [];

        this.allowNone = this.allowNone === undefined ? true : this.allowNone;
    }

    $onChanges (changes) {
        let response = changes.initialValue.currentValue;
        if (response !== undefined) {
            this.selected = response.Response !== undefined ? response.Response : response;
        }
    }

    handleClick (buttonValue) {
        if (this.isActive(buttonValue) && this.allowNone) {
            this.selected  = _without(this.selected, buttonValue);
        } else if (this.isActive(buttonValue) && !this.allowNone) {
            this.selected  = this.selected;
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
