import ChecklistItemClass from '../checklist-item.class';
import _filter from 'lodash/filter';
import _findIndex from 'lodash/findIndex';
import _cloneDeep from 'lodash/cloneDeep';
import uuidv4 from 'uuid/v4';

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

        this.MODAL_EDIT_HVAC_EQUIPMENT = this.MODAL.EDIT_HVAC_EQUIPMENT;

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

        super
            .$onInit()
            .then(() => {
                let documentIndex;

                this.itemData = this.itemData || {
                    EquipmentMatches : this.EQUIPMENT_MATCHES_DOCUMENT[0].key,
                    Equipment        : []
                };

                documentIndex = _findIndex(this.EQUIPMENT_MATCHES_DOCUMENT, {key : this.itemData.EquipmentMatches});

                this.selectedEquipmentMatches = this.EQUIPMENT_MATCHES_DOCUMENT[documentIndex];

                this.house = this.JobChecklistStateService.getCurrentHouse();
            });
    }

    onViewHvacDesignReport () {
        this.$rootScope.$emit(this.MESSAGING.VIEW_HVAC_DESIGN_REPORT);
    }

    onEquipmentMatchesChange () {
        this.itemData.EquipmentMatches = this.selectedEquipmentMatches.key;

        this.setItemData(this.itemData);
    }

    //TODO: DRY make an equipment or similar component/ directive
    editEquipment () {
        if (!this.isReview) {
            this
                .editEquipmentData = _cloneDeep(this.itemData.Equipment || []);

            this
                .ModalService
                .openModal(this.MODAL_EDIT_HVAC_EQUIPMENT);
        }
    }

    addEquipment () {
        const newEquipment = _cloneDeep(NEW_EQUIPMENT);
        newEquipment.id = uuidv4();

        this
            .editEquipmentData
            .push(newEquipment);
    }

    deleteEquipment (id) {
        const index = _findIndex(this.editEquipmentData, {id : id});

        this
            .editEquipmentData
            .splice(index, 1);
    }

    saveEquipment () {
        if (this.itemData.Equipment) {
            this.itemData.Equipment.length = 0;
        }

        this
            .$timeout(() => {
                this
                    .itemData
                    .Equipment
                    = _filter(this.editEquipmentData, equipment => {
                            return (equipment.Manufacturer !== '') || (equipment.Model !== '') || (equipment.SerialNumber !== '');
                        });

                this.setItemData(this.itemData);

                this
                    .ModalService
                    .closeModal(this.MODAL_EDIT_HVAC_EQUIPMENT);
            }, 25);
    }
    // end equipment DRY

    getEquipmentTypeName (key) {
        const index = _findIndex(this.EQUIPMENT_TYPE, {key : key});

        return this.EQUIPMENT_TYPE[index].name;
    }

    get hasHVACDesignReport () {
        const hvacDesignReportLength = (this.house) ? this.house.HvacDesignReport.length : 0;

        return hvacDesignReportLength > 0;
    }
}

export default ChecklistItemHVACCommissioningController;
