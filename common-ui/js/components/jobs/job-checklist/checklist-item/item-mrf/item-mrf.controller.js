import ChecklistItemClass from '../checklist-item.class';

class ChecklistItemMrfController extends ChecklistItemClass {
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

        this.$rootScope.$emit(this.MESSAGING.UPDATE_MRF_DATA, this.editRow[0]);

        this.editRow.pop();
    }
}

export default ChecklistItemMrfController;
