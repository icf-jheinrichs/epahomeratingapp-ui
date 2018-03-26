class HVACEquipmentController {
    constructor (ManufacturersService, ScannerService) {
        'ngInject';

        this.ManufacturersService = ManufacturersService;
        this.ScannerService       = ScannerService;
    }

    $onInit () {
        this.filteredManufacturers  = {
            WATER_HEATER : this.getFilteredManufacturers('WATER_HEATER')
        };

        this.index = parseInt(this.index, 10);
        this.selectedEquipmentManufacturer = {};
    }

    getFilteredManufacturers (equipmentType, filter = '') {
        return this.ManufacturersService.getFilteredManufacturers(equipmentType, filter);
    }

    setEquipmentManfacturer (equipmentType, value) {
        this.equipment.Manufacturer = value;
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
                    this.equipment.SerialNumber = barCode;
                });
        }
    }

    onEquipmentManufacturerChange (equipmentType) {
        this.equipment.Manufacturer = this.selectedEquipmentManufacturer.name;
    }

    onDeleteEquipment () {
        this.deleteEquipment({
            id : this.equipment.id
        });
    }
}

export default HVACEquipmentController;
