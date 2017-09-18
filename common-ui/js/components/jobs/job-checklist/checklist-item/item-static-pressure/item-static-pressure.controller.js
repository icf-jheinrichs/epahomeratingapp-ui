import ChecklistItemClass from '../checklist-item.class';

// TODO: try saving to local

class ChecklistItemStaticPressureController extends ChecklistItemClass {
    $onInit () {
        const INCHES_WATER_COLUMN = {
            'Abbr'  : 'IWC',
            'Title' : 'Inches of Water Column'
        };

        super
            .$onInit()
            .then(() => {
                this.itemData = this.itemData || {
                    'ReturnSideExternalStaticPressure' : undefined,
                    'SupplySideExternalStaticPressure' : undefined
                };
            });

        this.editRow  = [];
        this.mrfTable = {
            'Name'           : 'External Static Pressure',
            'EmptyTableText' : 'No External static pressure modeled',
            'Key'            : 'ExternalStaticPressur',
            'Columns'        : [
                {
                    'Name'               : 'Return-Side External Static Pressure',
                    'Unit'               : INCHES_WATER_COLUMN,
                    'ConnectedAttribute' : false,
                    'DataType'           : {
                        'Type' : 'Decimal',
                        'Name' : 'decimal_-1.0'
                    },
                    'Key'                : 'ReturnSideExternalStaticPressure',
                    'Locked'             : false,
                    'IsLibraryAttribute' : false
                },
                {
                    'Name'               : 'Supply Side External Static Pressure',
                    'Unit'               : INCHES_WATER_COLUMN,
                    'ConnectedAttribute' : false,
                    'DataType'           : {
                        'Type' : 'Decimal',
                        'Name' : 'decimal_1.0'
                    },
                    'Key'                : 'SupplySideExternalStaticPressure',
                    'Locked'             : false,
                    'IsLibraryAttribute' : false
                }
            ]
        };
    }

    editMrfRow (focus) {
        this
            .editRow
            .push({
                focus     : focus,
                title     : 'External Static Pressure',
                mrfDigest : this.mrfTable.Columns,
                mrfData   : this.itemData
            });
    }

    onCancelMrfRow () {
        this
            .editRow
            .pop();
    }

    onSaveMrfRow (mrfRowData) {
        this
            .itemData = mrfRowData;

        this
            .setItemData(this.itemData);

        this
            .editRow
            .pop();
    }
}

export default ChecklistItemStaticPressureController;
