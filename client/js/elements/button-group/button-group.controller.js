import _ from 'lodash';

class ButtonGroupController {
    constructor ($log) {
        'ngInject';

        this.$log = $log;
    }

    $onInit () {
        this.selected = [];
    }

    handleClick (buttonValue) {
        if (this.isActive(buttonValue)) {
            this.selected  = _.without(this.selected, buttonValue);
        } else if (this.allowMultiple) {
            this.selected  = _.union(this.selected, [buttonValue]);
        } else {
            this.selected = [buttonValue];
        }
    }

    isActive (buttonValue) {
        return _.indexOf(this.selected, buttonValue) >= 0;
    }
}

export default ButtonGroupController;
