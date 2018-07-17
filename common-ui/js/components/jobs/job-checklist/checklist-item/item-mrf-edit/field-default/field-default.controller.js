import MrfEditField from '../field.class.js';

class MrfEditFieldDefaultController extends MrfEditField {
    sanitize () {
        this.value = this.$sanitize(this.value);
    }
}

export default MrfEditFieldDefaultController;
