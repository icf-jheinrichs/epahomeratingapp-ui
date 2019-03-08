import MrfEditField from '../field.class.js';

class MrfEditFieldStringController extends MrfEditField {
    sanitize () {
        this.value = this.SanitizeService.sanitize(this.value);
    }

    $onInit () {
        this.DisplayLogicDigestService
            .getString(this.stringName)
            .then((string) => {
                this.stringType = string;
                this.stringFound = true;
            })
            .catch((error) => {
                this.stringFound = false;
            });
    }
}

export default MrfEditFieldStringController;
