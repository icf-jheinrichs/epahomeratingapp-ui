import ChecklistItemClass from '../checklist-item.class';
import _findIndex from 'lodash/findIndex';
import _forOwn from 'lodash/forOwn';
import _map from 'lodash/map';
import _padStart from 'lodash/padStart';
import _reduce from 'lodash/reduce';
import _union from 'lodash/union';

class ChecklistItemMrfController extends ChecklistItemClass {
    $onInit () {
        super
            .$onInit()
            .then(() => {
                // console.dir(this.itemData);
            });

        this
            .JobChecklistStateService
            .getChecklistItemHomePerformance(this.itemId)
            .then(homePerformance => {
                this.homePerformance = homePerformance;
            });

        this.editRow = [];
        this.editDuctSystemRow = [];
        this.editInfiltrationRow = [];
    }

    editMrfRow (index, key, title, digest, data) {
        switch (key) {
        case 'DuctLeakageMeasurement' :
            this.editDuctSystemRow.push({
                ItemId             : this.itemId,
                key                : key,
                index              : index,
                title              : title || 'Edit',
                mrfDigest          : digest,
                mrfData            : data
            });

            break;
        case 'Infiltration' :
            this.editInfiltrationRow.push({
                ItemId             : this.itemId,
                key                : key,
                index              : index,
                title              : title || 'Edit',
                mrfDigest          : digest,
                mrfData            : data
            });

            break;
        default :
            this.editRow.push({
                ItemId             : this.itemId,
                key                : key,
                index              : index,
                title              : title || 'Edit',
                mrfDigest          : digest,
                mrfData            : data
            });

            break;
        }
    }

    onCancelMrfRow () {
        this
            .editRow
            .pop();
    }

    onCancelDuctSystemMrfRow () {
        this
            .editDuctSystemRow
            .pop();
    }

    onCancelInfiltrationMrfRow () {
        this
            .editInfiltrationRow
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

    onSaveDuctSystemMrfRow (mrfRowData) {
        this.editDuctSystemRow[0].mrfData = mrfRowData;

        let editMeta = this.getEditMeta(this.editDuctSystemRow[0]);

        if (editMeta.editedMetaIds.length) {
            if (editMeta.libraryAttributeEdited) {
                let libraryTypeNameKey     = this.display.Sections[editMeta.sectionIndex].LibraryTypeNameKey;
                let currentLibraryTypeName = this.editDuctSystemRow[0].mrfData[libraryTypeNameKey];

                let newLibraryTypeName     = this.getLibraryTypeName({
                    sectionIndex : editMeta.sectionIndex,
                    editRowIndex : this.editDuctSystemRow[0].index
                });

                if (currentLibraryTypeName !== newLibraryTypeName) {
                    this.editDuctSystemRow[0].mrfData[libraryTypeNameKey] = newLibraryTypeName;
                    editMeta.editedMetaIds.push([this.editDuctSystemRow[0].key, this.editDuctSystemRow[0].index, libraryTypeNameKey].join(':'));
                }
            }

            this.updateItemData(editMeta.editedMetaIds);

            this
                .$rootScope
                .$emit(this.MESSAGING.UPDATE_MRF_DATA, this.editDuctSystemRow[0]);

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
            .editDuctSystemRow
            .pop();
    }

    onSaveInfiltrationMrfRow (mrfRowData) {
        this.editInfiltrationRow[0].mrfData = mrfRowData;

        let editMeta = this.getEditMeta(this.editInfiltrationRow[0]);

        if (editMeta.editedMetaIds.length) {
            if (editMeta.libraryAttributeEdited) {
                let libraryTypeNameKey     = this.display.Sections[editMeta.sectionIndex].LibraryTypeNameKey;
                let currentLibraryTypeName = this.editInfiltrationRow[0].mrfData[libraryTypeNameKey];

                let newLibraryTypeName     = this.getLibraryTypeName({
                    sectionIndex : editMeta.sectionIndex,
                    editRowIndex : this.editInfiltrationRow[0].index
                });

                if (currentLibraryTypeName !== newLibraryTypeName) {
                    this.editInfiltrationRow[0].mrfData[libraryTypeNameKey] = newLibraryTypeName;
                    editMeta.editedMetaIds.push([this.editInfiltrationRow[0].key, this.editInfiltrationRow[0].index, libraryTypeNameKey].join(':'));
                }
            }

            this.updateItemData(editMeta.editedMetaIds);

            this
                .$rootScope
                .$emit(this.MESSAGING.UPDATE_MRF_DATA, this.editInfiltrationRow[0]);

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
            .editInfiltrationRow
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

        let libraryNameQuantity       = _reduce(sectionLibraryNames, (result, value, key) => {
            if (value === libraryName) {
                result += 1;
            }
            return result;
        }, 0);

        // if there's only one row - no need to change name
        // if the only instance of that library type - no need to change name
        if (sectionLibraryNames.length === 1 || libraryNameQuantity === 1) {
            return libraryName;
        }

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

    firstRowIsEmpty (dataRow) {
        let rowStringJoin = _reduce(dataRow, (result, value, key) => {
            result += value;

            return result;
        }, '');

        return rowStringJoin.length === 0;
    }

    attributeIsEdited (mrfTableKey, index, key) {
        let houseId = this.$stateParams.houseId;

        if (this.itemData === undefined || this.itemData[houseId] === undefined) {
            return false;
        }

        let editIndex = this.itemData[houseId].indexOf([mrfTableKey, index, key].join(':'));

        return editIndex >= 0;
    }
}

export default ChecklistItemMrfController;
