import _assign from 'lodash/assign';

class MrfEditController {
    constructor (JobChecklistStateService) {
        'ngInject';

        this.isReview = JobChecklistStateService.isReview;
    }

    $onInit () {
        this.editMrfData = _assign({}, this.mrfData);

        this.showMrfEditModal = false;
    }

    $postLink () {
        this.showMrfEditModal = true;

        //TODO: put this somewhere better;
        angular
            .element(document)
            .find('body')
            .addClass('overlay-open');
    }

    showField (field, value) {
        let displayLogic = true;

        if (field.DisplayLogic !== undefined
            && field.DisplayLogic === 'DisplayIfExists'
            && !value) {

            displayLogic = false;
        }

        return displayLogic;
    }

    cancel () {
        this.showMrfEditModal = false;
        this.onCancelMrfRow();

        //TODO: put this somewhere better;
        angular
            .element(document)
            .find('body')
            .removeClass('overlay-open');
    }

    save () {
        if (!this.mrfEditForm.$invalid) {
            this.showMrfEditModal = false;

            this.onSaveMrfRow({
                mrfRowEditData : this.editMrfData
            });

            //TODO: put this somewhere better;
            angular
                .element(document)
                .find('body')
                .removeClass('overlay-open');
        }
    }
}

export default MrfEditController;
