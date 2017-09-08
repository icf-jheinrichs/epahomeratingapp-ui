import _assign from 'lodash/assign';

class MrfEditController {
    constructor (DialogService, UI_ENUMS) {
        'ngInject';

        this.DialogService = DialogService;
        this.DIALOG        = UI_ENUMS.DIALOG.LEAKAGE_TEST_EXEMPTION;

        this.UNITS         = {
            CFM25 : {
                Abbr  : 'CFM25',
                Title : 'cubic feet per minute needed to create a 25 Pascal pressure change'
            }
        };
    }

    $onInit () {
        this.editMrfData = _assign({}, this.mrfData);

        this.showMrfEditModal = false;

        this.leakageTestIsExempt = this.editMrfData.DuctLeakTestExemption === 'true';

        this.leakageToOutside = {
            total      : this.editMrfData.DuctLeakTotal,
            cfm25ofCFA : 0
        };

        this.leakageTotal = {
            total      : this.editMrfData.DuctLeakRealTotal,
            cfm25ofCFA : 0
        };

        this.calculateLeakageOutside();
        this.calculateLeakageTotal();
    }

    $postLink () {
        this.showMrfEditModal = true;

        //TODO: put this somewhere better;
        angular
            .element(document)
            .find('body')
            .addClass('overlay-open');
    }

    calculateLeakageOutside () {
        let cfm25ofCFA = (this.leakageToOutside.total / this.editMrfData.CondFloorArea) * 100;

        cfm25ofCFA = Math.round(cfm25ofCFA * 100) / 100;

        this.leakageToOutside.cfm25ofCFA = cfm25ofCFA;

        if (this.editMrfData.DuctLeakUnits === 'CFM @ 25 Pascals') {
            this.editMrfData.DuctLeakTotal = this.leakageToOutside.total;
        } else if (this.editMrfData.DuctLeakUnits === 'CFM25 / CFA') {
            this.editMrfData.DuctLeakTotal = this.leakageToOutside.cfm25ofCFA;
        }
    }

    calculateLeakageTotal () {
        let cfm25ofCFA = (this.leakageTotal.total / this.editMrfData.CondFloorArea) * 100;

        cfm25ofCFA = Math.round(cfm25ofCFA * 100) / 100;

        this.leakageTotal.cfm25ofCFA = cfm25ofCFA;

        if (this.editMrfData.DuctLeakUnits === 'CFM @ 25 Pascals') {
            this.editMrfData.DuctLeakRealTotal = this.leakageTotal.total;
        } else if (this.editMrfData.DuctLeakUnits === 'CFM25 / CFA') {
            this.editMrfData.DuctLeakRealTotal = this.leakageTotal.cfm25ofCFA;
        }
    }

    calculateLeakages () {
        this.calculateLeakageOutside();
        this.calculateLeakageTotal();
    }

    setExemption (value) {
        if (value === 'true' && this.editMrfData.DuctLeakTotal !== 0 && this.editMrfData.DuctLeakTotal !== undefined && this.editMrfData.DuctLeakTotal !== null) {
            this
                .DialogService
                .openDialog(this.DIALOG)
                .then((confirmed) => {
                    if (confirmed) {
                        this.leakageTestIsExempt = true;
                        this.editMrfData.DuctLeakTotal = this.leakageToOutside.total = 0;
                        this.calculateLeakageOutside();
                    } else {
                        this.editMrfData.DuctLeakTestExemption = 'false';
                    }
                });
        } else if (value === 'true') {
            this.leakageTestIsExempt = true;
        } else {
            this.leakageTestIsExempt = false;
        }
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
