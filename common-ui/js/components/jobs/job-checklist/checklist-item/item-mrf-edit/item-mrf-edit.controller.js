import _assign from 'lodash/assign';

class MrfEditController {
    constructor () {
        'ngInject';
    }

    $onInit () {
        this.editMrfData = _assign({}, this.mrfData);

        this.showMrfEditModal = false;
    }

    $postLink () {
        this.showMrfEditModal = true;

        //TODO: put this somewhere better;
        angular.element(document).find('body').addClass('overlay-open');
    }

    cancel () {
        this.showMrfEditModal = false;
        this.onCancelMrfRow();

        //TODO: put this somewhere better;
        angular.element(document).find('body').removeClass('overlay-open');
    }

    save () {
        if (!this.mrfEditForm.$invalid) {
            _assign(this.mrfData, this.editMrfData);
            this.showMrfEditModal = false;

            this.onSaveMrfRow({
                mrfRowData : this.editMrfData
            });

            //TODO: put this somewhere better;
            angular.element(document).find('body').removeClass('overlay-open');
        }
    }
}

export default MrfEditController;
