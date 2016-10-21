import _ from 'lodash';

class MrfEditController {
    constructor () {
        'ngInject';

        this.editMrfData = _.assign({}, this.mrfData);
    }

    $onInit () {
        this.showMrfEditModal = false;
    }

    $postLink () {
        this.showMrfEditModal = true;

        //TODO: put this somewhere better;
        angular.element(document).find('body').addClass('modal-open');
    }

    cancel () {
        this.showMrfEditModal = false;
        this.onCancelMrfRow();

        //TODO: put this somewhere better;
        angular.element(document).find('body').removeClass('modal-open');
    }

    save () {
        _.assign(this.mrfData, this.editMrfData);
        this.showMrfEditModal = false;

        this.onSaveMrfRow({
            mrfRowData : this.editMrfData
        });

        //TODO: put this somewhere better;
        angular.element(document).find('body').removeClass('modal-open');
    }
}

export default MrfEditController;
