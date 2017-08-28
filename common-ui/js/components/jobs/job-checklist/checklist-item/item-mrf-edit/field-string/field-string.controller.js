import MrfEditField from '../field.class.js';

class MrfEditFieldStringController extends MrfEditField {
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
