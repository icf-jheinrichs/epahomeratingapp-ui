import _assign from 'lodash/assign';

class MrfEditController {
    constructor (JobChecklistStateService) {
        'ngInject';

        this.JobChecklistStateService = JobChecklistStateService;

        this.infiltrationDisplayData = {
            'Name'               : 'Infiltration Value',
            'ConnectedAttribute' : true,
            'DataType'           : {
                'Type' : 'Decimal',
                'Name' : 'decimal_9999.99'
            },
            'Key'                : 'InfiltrationValue',
            'Locked'             : false,
            'IsLibraryAttribute' : false,
            'Unit'               : {
                'Abbr'  : 'CFM50',
                'Title' : 'cubic feet per minute needed needed to create a change in building pressure of 50 Pascals'
            }
        };
    }

    $onInit () {
        const ACHITECTURAL_CHARACTERISTICS_ID = 'BE 1';

        this
            .JobChecklistStateService
            .getChecklistItemHomePerformance(ACHITECTURAL_CHARACTERISTICS_ID)
            .then((mrfData) => {
                this.BuildingVolume = mrfData.BuildingSummary[0].BuildingVolume;
                this.calculateInfiltrationValue();
            });

        this.editMrfData = _assign({}, this.mrfData);

        this.showMrfEditModal = false;

        this.infiltrationValue = this.editMrfData.HeatingSeasonValue;
    }

    $postLink () {
        this.showMrfEditModal = true;

        //TODO: put this somewhere better;
        angular
            .element(document)
            .find('body')
            .addClass('overlay-open');
    }

    calculateInfiltrationValue () {
        let ach50 = (this.infiltrationValue / this.BuildingVolume) * 60;

        ach50 = Math.round(ach50 * 100) / 100;

        this.ACH50 = ach50;

        if (this.editMrfData.Units === 'CFM @ 50 Pascals') {
            this.editMrfData.HeatingSeasonValue = this.infiltrationValue;
            this.editMrfData.CoolingSeasonValue = this.infiltrationValue;
        } else if (this.editMrfData.Units === 'ACH @ 50 Pascals') {
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
