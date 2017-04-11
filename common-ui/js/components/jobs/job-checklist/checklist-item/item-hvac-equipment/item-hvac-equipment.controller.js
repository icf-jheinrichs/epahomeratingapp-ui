import ChecklistItemClass from '../checklist-item.class';
import _findIndex from 'lodash/findIndex';
import _cloneDeep from 'lodash/cloneDeep';

const NEW_EQUIPMENT = {
    Type         : '',
    Furnace      : {
        Manufacturer : '',
        Model        : '',
        SerialNumber : ''
    },
    Condenser    : {
        Manufacturer : '',
        Model        : '',
        SerialNumber : ''
    },
    Evaporator   : {
        Manufacturer : '',
        Model        : '',
        SerialNumber : ''
    }
};

class ChecklistItemHVACCommissioningController extends ChecklistItemClass {
    $onInit () {
        let documentIndex;

        super.$onInit();

        this.EQUIPMENT_MATCHES_DOCUMENT = [
            {
                key  : 'hvac-design-report',
                name : 'HVAC Design Report'
            },
            {
                key  : 'written-approval',
                name : 'Written approval from designer'
            }
        ];

        this.itemData = this.itemData || {
            EquipmentMatches : this.EQUIPMENT_MATCHES_DOCUMENT[0].key,
            Equipment        : []
        };

        documentIndex = _findIndex(this.EQUIPMENT_MATCHES_DOCUMENT, {key : this.itemData.EquipmentMatches});

        this.selectedEquipmentMatches = this.EQUIPMENT_MATCHES_DOCUMENT[documentIndex];
    }

    onViewHvacDesignReport () {
        this.$rootScope.$emit(this.MESSAGING.VIEW_HVAC_DESIGN_REPORT);
    }

    onEquipmentMatchesChange () {
        this.itemData.EquipmentMatches = this.selectedEquipmentMatches.key;

        this.setItemData(this.itemData);
    }

    addEquipment () {
        this.itemData.Equipment.push(_cloneDeep(NEW_EQUIPMENT));
    }

    deleteEquipment (index) {
        this.itemData.Equipment.splice(index, 1);

        this.setItemData(this.itemData);
    }

    saveEquipment (index, equipment) {
        return this.$q((resolve, reject) => {
            this.itemData.Equipment[index] = equipment;

            this.setItemData(this.itemData);

            resolve({success : true});
        });
    }
}

export default ChecklistItemHVACCommissioningController;
