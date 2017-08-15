import ChecklistItemClass from '../checklist-item.class';
import _reduce from 'lodash/reduce';

class ChecklistItemMrfController extends ChecklistItemClass {
    $onInit () {
        super.$onInit();

        this
            .JobChecklistStateService
            .getChecklistItemHomePerformance(this.itemId)
            .then(homePerformance => {
                this.homePerformance = homePerformance;
            });

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
        });

        return rowStringJoin.length === 0;
    }
}

export default ChecklistItemMrfController;
