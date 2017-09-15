import _assign from 'lodash/assign';

class MrfEditController {
    constructor (JobChecklistStateService) {
        'ngInject';

        this.JobChecklistStateService = JobChecklistStateService;

        this.infiltrationDisplayData = {
            'Name'               : 'Infiltration Value',
            'ConnectedAttribute' : true,
            'DataType'           : {
                'Type' : 'Integer',
                'Name' : 'int_99999'
            },
            'Key'                : 'InfiltrationValue',
            'Locked'             : false,
            'IsLibraryAttribute' : false,
            'Unit'               : {
                'Abbr'  : 'CFM50',
                'Title' : 'cubic feet per minute needed needed to create a change in building pressure of 50 Pascals'
            }
        };

        this.PRECISION = {
            ACH50     : 100
        };
    }

    $onInit () {
        const ACHITECTURAL_CHARACTERISTICS_ID = 'BE 1';

        this.editMrfData       = _assign({}, this.mrfData);

        this.showMrfEditModal  = false;

        this
            .JobChecklistStateService
            .getChecklistItemHomePerformance(ACHITECTURAL_CHARACTERISTICS_ID)
            .then((mrfData) => {
                this.BuildingVolume = mrfData.BuildingSummary[0].BuildingVolume;

                this.unitsAreCfm       = this.editMrfData.Units === 'CFM @ 50 Pascals';

                let heatingSeasonValue = parseFloat(this.editMrfData.HeatingSeasonValue);

                this.infiltrationValue = (this.unitsAreCfm) ? heatingSeasonValue : this.calculateInitialInfiltrationValue();
                this.ACH50             = (!this.unitsAreCfm) ? heatingSeasonValue : this.calculateAch50();
            });
    }

    $postLink () {
        this.showMrfEditModal = true;

        //TODO: put this somewhere better;
        angular
            .element(document)
            .find('body')
            .addClass('overlay-open');
    }

    calculateInitialInfiltrationValue () {
        let infiltration = (this.mrfData.HeatingSeasonValue * this.BuildingVolume) / 60;

        return Math.round(infiltration);
    }

    calculateAch50 () {
        let ach50 = (this.infiltrationValue / this.BuildingVolume) * 60;

        return Math.round(ach50 * this.PRECISION.ACH50) / this.PRECISION.ACH50;
    }

    calculateInfiltrationValue () {
        this.ACH50 = this.calculateAch50();

        if (this.unitsAreCfm) {
            this.editMrfData.HeatingSeasonValue = this.infiltrationValue;
            this.editMrfData.CoolingSeasonValue = this.infiltrationValue;
        } else if (!this.unitsAreCfm) {
            this.editMrfData.HeatingSeasonValue = this.ACH50;
            this.editMrfData.CoolingSeasonValue = this.ACH50;
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
