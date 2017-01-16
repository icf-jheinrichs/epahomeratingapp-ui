import ChecklistItemClass from '../checklist-item.class';

// TODO: try saving to local

class ChecklistItemStaticPressureController extends ChecklistItemClass {
    $onInit () {
        super.$onInit();

        this.editRow = [];
    }

    editMrfRow (index, key, title, digest, data) {
        this.editRow.push({
            ItemId    : this.itemId,
            key       : key,
            index     : index,
            title     : title || 'Edit',
            mrfDigest : digest,
            mrfData   : data
        });
    }

    onCancelMrfRow () {
        this.editRow.pop();
    }

    onSaveMrfRow (mrfRowData) {
        this.editRow[0].mrfData = mrfRowData;

        //TODO: use event constant enum
        this.$rootScope.$emit(this.MESSAGING.UPDATE_MRF_DATA, this.editRow[0]);

        this.editRow.pop();
    }

    test(mrfRowData) {
        console.log(this.editRow);
    }
}

export default ChecklistItemStaticPressureController;
