import _findIndex from 'lodash/findIndex';

class HVACEquipmentController {
    constructor (ManufacturersService, ScannerService) {
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

        this.MANUFACTURERS  = {
            EVAPORATOR   : ManufacturersService.evaporatorManufacturers(),
            CONDENSER    : ManufacturersService.condenserManufacturers(),
            FURNACE      : ManufacturersService.furnaceManufacturers()
        };
        this.ScannerService = ScannerService;
    }

    $onInit () {
        let equipmentIndex;
        let furnaceManufacturerIndex;
        let condenserManufacturerIndex;
        let evaporatorManufacturerIndex;

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

        //TODO: find a better solution
        if (this.equipment.Furnace.Manufacturer === '') {
            this.selectedEquipmentManufacturer.Furnace = this.MANUFACTURERS.FURNACE[0];

            this.equipment.Furnace.Manufacturer = this.MANUFACTURERS.FURNACE[0].name;
        } else {
            furnaceManufacturerIndex = _findIndex(this.MANUFACTURERS.FURNACE, {name : this.equipment.Furnace.Manufacturer});

            this.selectedEquipmentManufacturer.Furnace = this.MANUFACTURERS.FURNACE[furnaceManufacturerIndex];
        }

        //TODO: find a better solution
        if (this.equipment.Condenser.Manufacturer === '') {
            this.selectedEquipmentManufacturer.Condenser = this.MANUFACTURERS.CONDENSER[0];

            this.equipment.Condenser.Manufacturer = this.MANUFACTURERS.CONDENSER[0].name;
        } else {
            condenserManufacturerIndex = _findIndex(this.MANUFACTURERS.CONDENSER, {name : this.equipment.Condenser.Manufacturer});

            this.selectedEquipmentManufacturer.Condenser = this.MANUFACTURERS.CONDENSER[condenserManufacturerIndex];
        }

        //TODO: find a better solution
        if (this.equipment.Evaporator.Manufacturer === '') {
            this.selectedEquipmentManufacturer.Evaporator = this.MANUFACTURERS.EVAPORATOR[0];

            this.equipment.Evaporator.Manufacturer = this.MANUFACTURERS.EVAPORATOR[0].name;
        } else {
            evaporatorManufacturerIndex = _findIndex(this.MANUFACTURERS.EVAPORATOR, {name : this.equipment.Evaporator.Manufacturer});

            this.selectedEquipmentManufacturer.Evaporator = this.MANUFACTURERS.EVAPORATOR[evaporatorManufacturerIndex];
        }
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
