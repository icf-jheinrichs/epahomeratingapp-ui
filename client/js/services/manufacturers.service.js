import _filter from 'lodash/filter';

class ManufacturersService {
    constructor (UI_ENUMS) {
        'ngInject';

        this.FILTERED_MANUFACTURERS = {
            EVAPORATOR   : _filter(UI_ENUMS.MANUFACTURERS, (manufacturer) => {
                return manufacturer.type.evaporator;
            }),
            CONDENSER    : _filter(UI_ENUMS.MANUFACTURERS, (manufacturer) => {
                return manufacturer.type.condenser;
            }),
            FURNACE      : _filter(UI_ENUMS.MANUFACTURERS, (manufacturer) => {
                return manufacturer.type.furnace;
            }),
            WATER_HEATER : _filter(UI_ENUMS.MANUFACTURERS, (manufacturer) => {
                return manufacturer.type.waterHeater;
            })
        };
    }

    evaporatorManufacturers () {
        return this.FILTERED_MANUFACTURERS.EVAPORATOR;
    }

    condenserManufacturers () {
        return this.FILTERED_MANUFACTURERS.CONDENSER;
    }

    furnaceManufacturers () {
        return this.FILTERED_MANUFACTURERS.FURNACE;
    }

    waterHeaterManufacturers () {
        return this.FILTERED_MANUFACTURERS.WATER_HEATER;
    }
}

export default ManufacturersService;
