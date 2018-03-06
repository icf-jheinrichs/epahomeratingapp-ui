import _assign from 'lodash/assign';

class MrfEditController {
    constructor (DialogService, JobChecklistStateService, UI_ENUMS) {
        'ngInject';

        this.DialogService = DialogService;
        this.DIALOG        = UI_ENUMS.DIALOG.LEAKAGE_TEST_EXEMPTION;
        this.isReview      = JobChecklistStateService.isReview;

        this.UNITS         = {
            CFM25 : {
                Abbr  : 'CFM25',
                Title : 'cubic feet per minute needed to create a 25 Pascal pressure change'
            }
        };

        this.PRECISION = {
            CFM25     : 100,
            CFM25_CFA : 10000
        };
    }

    $onInit () {
        this.editMrfData = _assign({}, this.mrfData);

        this.showMrfEditModal = false;

        this.leakageTestIsExempt = this.editMrfData.DuctLeakTestExemption === 'true';
        this.unitsAreCfm25cfa    = this.editMrfData.DuctLeakUnits === 'CFM25 / CFA';

        this.leakageToOutside    = this.initLeakageToOutside();
        this.leakageTotal        = this.initLeakageTotal();

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

    initLeakageToOutside () {
        let ductLeakTotal = parseFloat(this.editMrfData.DuctLeakTotal);

        let total         = (!this.unitsAreCfm25cfa) ? ductLeakTotal : this.calculateInitialLeakageTotal(ductLeakTotal, this.PRECISION.CFM25);
        let cfm25ofCFA    = (this.unitsAreCfm25cfa) ? ductLeakTotal : this.calculateLeakageCfm25ofCFA(ductLeakTotal, this.PRECISION.CFM25_CFA);

        return {
            total,
            cfm25ofCFA
        };
    }

    initLeakageTotal () {
        let ductLeakRealTotal = parseFloat(this.editMrfData.DuctLeakRealTotal);

        let total             = (!this.unitsAreCfm25cfa) ? ductLeakRealTotal : this.calculateInitialLeakageTotal(ductLeakRealTotal, this.PRECISION.CFM25);
        let cfm25ofCFA        = (this.unitsAreCfm25cfa) ? ductLeakRealTotal : this.calculateLeakageCfm25ofCFA(ductLeakRealTotal, this.PRECISION.CFM25_CFA);

        return {
            total,
            cfm25ofCFA
        };
    }

    calculateInitialLeakageTotal (cfm25ofCFA, PRECISION_MULTIPLIER) {
        let total = cfm25ofCFA * this.editMrfData.CondFloorArea;

        return Math.round(total * PRECISION_MULTIPLIER) / PRECISION_MULTIPLIER;
    }

    calculateLeakageCfm25ofCFA (total, PRECISION_MULTIPLIER) {
        let cfm25ofCFA = total / this.editMrfData.CondFloorArea;

        return Math.round(cfm25ofCFA * PRECISION_MULTIPLIER) / PRECISION_MULTIPLIER;
    }

    calculateLeakageOutside () {
        this.leakageToOutside.cfm25ofCFA = this.calculateLeakageCfm25ofCFA(this.leakageToOutside.total, this.PRECISION.CFM25_CFA);

        if (this.editMrfData.DuctLeakUnits === 'CFM @ 25 Pascals') {
            this.editMrfData.DuctLeakTotal = this.leakageToOutside.total;
        } else if (this.editMrfData.DuctLeakUnits === 'CFM25 / CFA') {
            this.editMrfData.DuctLeakTotal = this.leakageToOutside.cfm25ofCFA;
        }
    }

    calculateLeakageTotal () {
        this.leakageTotal.cfm25ofCFA = this.calculateLeakageCfm25ofCFA(this.leakageTotal.total, this.PRECISION.CFM25_CFA);

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
                        this.leakageTestIsExempt       = true;
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
