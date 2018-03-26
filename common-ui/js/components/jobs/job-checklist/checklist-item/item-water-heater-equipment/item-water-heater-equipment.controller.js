import ChecklistItemClass from '../checklist-item.class';
import _cloneDeep from 'lodash/cloneDeep';
import _findIndex from 'lodash/findIndex';
import _forOwn from 'lodash/forOwn';
import _reduce from 'lodash/reduce';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _padStart from 'lodash/padStart';
import _union from 'lodash/union';
import uuidv4 from 'uuid/v4';

const NEW_EQUIPMENT = {
    id           : '',
    Manufacturer : '',
    Model        : '',
    SerialNumber : ''
};

class ChecklistItemHVACCommissioningController extends ChecklistItemClass {
    $onInit () {
        this.MODAL_EDIT_WATER_HEATER_EQUIPMENT = this.MODAL.EDIT_WATER_HEATER_EQUIPMENT;

        super
            .$onInit()
            .then(() => {
                this.house = this.JobChecklistStateService.getCurrentHouse();
            });

        this
            .JobChecklistStateService
            .getChecklistItemHomePerformance(this.itemId)
            .then(homePerformance => {
                this.homePerformance = homePerformance;
            });

        this.editRow = [];
    }

    //TODO: DRY make an equipment or similar component/ directive
    editEquipment () {
        if (!this.isReview) {
            this
                .editEquipmentData = _cloneDeep(this.itemData.Equipment || []);

            this
                .ModalService
                .openModal(this.MODAL_EDIT_WATER_HEATER_EQUIPMENT);
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
        this.itemData.Equipment.length = 0;

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
                    .closeModal(this.MODAL_EDIT_WATER_HEATER_EQUIPMENT);
            }, 25);
    }
    // end equipment DRY

    //TODO: DRY make an MRF component/ directive
    firstRowIsEmpty (dataRow) {
        let rowStringJoin = _reduce(dataRow, (result, value, key) => {
            result += value;

            return result;
        }, '');

        return rowStringJoin.length === 0;
    }

    hasRows (dataRows) {
        if (dataRows === undefined) {
            return false;
        } else if (dataRows.length === 0) {
            return false;
        } else if (this.firstRowIsEmpty(dataRows[0])) {
            return false;
        }

        return true;
    }

    editMrfRow (index, key, title, digest, data) {
        this.editRow.push({
            ItemId             : this.itemId,
            key                : key,
            index              : index,
            title              : title || 'Edit',
            mrfDigest          : digest,
            mrfData            : data
        });
    }

    onCancelMrfRow () {
        this
            .editRow
            .pop();
    }

    onSaveMrfRow (mrfRowData) {
        this.editRow[0].mrfData = mrfRowData;

        let editMeta = this.getEditMeta(this.editRow[0]);

        if (editMeta.editedMetaIds.length) {
            if (editMeta.libraryAttributeEdited) {
                let libraryTypeNameKey     = this.display.Sections[editMeta.sectionIndex].LibraryTypeNameKey;
                let currentLibraryTypeName = this.editRow[0].mrfData[libraryTypeNameKey];

                let newLibraryTypeName     = this.getLibraryTypeName({
                    sectionIndex : editMeta.sectionIndex,
                    editRowIndex : this.editRow[0].index
                });

                if (currentLibraryTypeName !== newLibraryTypeName) {
                    this.editRow[0].mrfData[libraryTypeNameKey] = newLibraryTypeName;
                    editMeta.editedMetaIds.push([this.editRow[0].key, this.editRow[0].index, libraryTypeNameKey].join(':'));
                }
            }

            this.updateItemData(editMeta.editedMetaIds);

            this
                .$rootScope
                .$emit(this.MESSAGING.UPDATE_MRF_DATA, this.editRow[0]);

            this
                .$rootScope
                .$emit(this.MESSAGING.UPDATE_CHECKLIST_ITEM_DATA, {
                    'ItemId'           : this.itemId,
                    'Category'         : this.itemCategory,
                    'CategoryProgress' : this.itemCategoryProgress,
                    'ItemData'         : this.itemData
                });
        }

        this
            .editRow
            .pop();
    }

    getEditMeta (mrfEditRowData) {
        let editedMetaIds          = [];
        let libraryAttributeEdited = false;
        let sectionIndex           = _findIndex(this.display.Sections, {Key : mrfEditRowData.key});
        let section                = this.display.Sections[sectionIndex];
        let libraryTypeNameKey     = section.LibraryTypeNameKey;

        _forOwn(this.homePerformance[mrfEditRowData.key][mrfEditRowData.index], (value, key) => {
            let columnIndex  = _findIndex(section.Columns, {Key : key});

            if (columnIndex >= 0) {
                let column       = section.Columns[columnIndex];
                let dataType     = column.DataType.Type;
                let compareValue;

                switch (dataType) {
                case 'Decimal' :
                    compareValue = parseFloat(value);
                    break;
                case 'Integer' :
                    compareValue = parseInt(value, 10);
                    break;
                default :
                    compareValue = value;
                    break;
                }

                let id = [mrfEditRowData.key, mrfEditRowData.index, key].join(':');

                if (compareValue !== mrfEditRowData.mrfData[key]) {
                    editedMetaIds.push(id);

                    if (libraryTypeNameKey && column.IsLibraryAttribute) {
                        libraryAttributeEdited = true;
                    }
                }
            }

        });

        return {
            editedMetaIds,
            libraryAttributeEdited,
            sectionIndex
        };
    }

    getLibraryTypeName (libraryInfo) {
        //TODO: get this from the data digest
        const TYPE_NAME_MAX_LENGTH    = 30;
        const LIBRARY_TYPE_PREFIX     = '-RP';
        const SUFFIX_MAX_LENGTH       = 2;
        const PREFIXED_MAX_LENGTH     = TYPE_NAME_MAX_LENGTH - LIBRARY_TYPE_PREFIX.length - SUFFIX_MAX_LENGTH;

        let libraryTypeNameKey        = this.display.Sections[libraryInfo.sectionIndex].LibraryTypeNameKey;
        let homePerformanceKey        = this.display.Sections[libraryInfo.sectionIndex].Key;
        let sectionLibraryNames       = _map(this.homePerformance[homePerformanceKey], libraryTypeNameKey);

        let libraryName               = sectionLibraryNames[libraryInfo.editRowIndex];
        let iterator                  = 0;
        let libraryTypeSuffix;

        libraryName = libraryName.substring(0, PREFIXED_MAX_LENGTH);

        sectionLibraryNames.forEach((value) => {
            let libraryNameSplit = value.split(LIBRARY_TYPE_PREFIX);

            if (libraryNameSplit.length === 2 && libraryNameSplit[0] === libraryName) {
                iterator = Math.max(iterator, parseInt(libraryNameSplit[1], 10));
            }
        });

        iterator += 1;

        libraryTypeSuffix = _padStart(iterator.toString(), SUFFIX_MAX_LENGTH, '0');

        return libraryName + LIBRARY_TYPE_PREFIX + libraryTypeSuffix;
    }

    updateItemData (editedMetaIds) {
        let houseId = this.$stateParams.houseId;

        if (this.itemData === undefined) {
            this.itemData = {};
        }

        if (this.itemData[houseId] === undefined) {
            this.itemData[houseId] = editedMetaIds;
        } else {
            this.itemData[houseId] = _union(this.itemData[houseId], editedMetaIds);
        }
    }

    attributeIsEdited (mrfTableKey, index, key) {
        let houseId = this.$stateParams.houseId;

        if (this.itemData === undefined || this.itemData[houseId] === undefined) {
            return false;
        }

        let editIndex = this.itemData[houseId].indexOf([mrfTableKey, index, key].join(':'));

        return editIndex >= 0;
    }
    //end MRF DRY
}

export default ChecklistItemHVACCommissioningController;
