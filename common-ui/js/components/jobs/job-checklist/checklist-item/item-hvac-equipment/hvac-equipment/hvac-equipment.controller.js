import _findIndex from 'lodash/findIndex';

class HVACEquipmentController {
    constructor (ManufacturersService, ScannerService, CONTEXT, UI_ENUMS) {
        'ngInject';

        this.EQUIPMENT_TYPE = [
            {
                key  : 'furnace',
                name : 'Furnace'
            },
            {
                key  : 'ac',
                name : 'Air Conditioner'
            },
            {
                key  : 'hp',
                name : 'Heat Pump'
            }
        ];

        this.ManufacturersService = ManufacturersService;
        this.ScannerService       = ScannerService;

        this.CONTEXT_IS_ADMIN = CONTEXT !== UI_ENUMS.CONTEXT.APP;
    }

    $onInit () {
        let equipmentIndex;
        // let furnaceManufacturerIndex;
        // let condenserManufacturerIndex;
        // let evaporatorManufacturerIndex;

        this.filteredManufacturers  = {
            HVAC : this.getFilteredManufacturers('HVAC')
        };

        this.index = parseInt(this.index, 10);
        this.selectedEquipmentManufacturer = {};

        if (this.equipment.Type === '') {
            this.equipment.Type = this.EQUIPMENT_TYPE[0].key;

            this.selectedEquipmentType = this.EQUIPMENT_TYPE[0];

            this.isEditMode = true;
        } else {
            equipmentIndex = _findIndex(this.EQUIPMENT_TYPE, {key : this.equipment.Type});

            this.selectedEquipmentType = this.EQUIPMENT_TYPE[equipmentIndex];

            this.isEditMode = false;
        }

    }

    getFilteredManufacturers (equipmentType, filter = '') {
        return this.ManufacturersService.getFilteredManufacturers(equipmentType, filter);
    }

    setEquipmentManfacturer (equipmentType, value) {
        this.equipment[equipmentType].Manufacturer = value;
    }

    updatedFilteredEquipment (equipmentType, typeaheadValue) {
        this.filteredManufacturers[equipmentType] = this.getFilteredManufacturers(equipmentType, typeaheadValue);
    }

    onScanBarcode (equipmentType) {
        if (this.isEditMode) {
            this
                .ScannerService
                .scanBarCode()
                .then((barCode) => {
                    this.equipment[equipmentType].SerialNumber = barCode;
                });
        }
    }

    onEquipmentTypeChange () {
        this.equipment.Type = this.selectedEquipmentType.key;
    }

    onEquipmentManufacturerChange (equipmentType) {
        this.equipment[equipmentType].Manufacturer = this.selectedEquipmentManufacturer[equipmentType].name;
    }

    onDeleteEquipment () {
        this.deleteEquipment({
            index : this.index
        });
    }

    onSaveEquipment () {
        this.saveEquipment({
            index     : this.index,
            equipment : this.equipment
        })
            .then(() => {
                this.toggleEditMode();
            });
    }

    toggleEditMode () {
        this.isEditMode = !this.isEditMode;
    }
}

export default HVACEquipmentController;
