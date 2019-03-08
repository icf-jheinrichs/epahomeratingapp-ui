import MrfEditField from '../field.class.js';

class MrfEditFieldDefaultController extends MrfEditField {
    sanitize () {
        this.value = this.SanitizeService.sanitize(this.value);
    }
}

export default MrfEditFieldDefaultController;
