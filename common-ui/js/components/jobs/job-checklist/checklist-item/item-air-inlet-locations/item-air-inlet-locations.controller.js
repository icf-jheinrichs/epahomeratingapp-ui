import ChecklistItemClass from '../checklist-item.class';
import _findIndex from 'lodash/findIndex';

class ChecklistItemAirInletLocationsController extends ChecklistItemClass {
    $onInit () {
        let documentIndex;

        super.$onInit();

        this.SPECIFIED_IN_HVAC_REPORT = [
            {
                key   : 'yes',
                name  : 'Yes',
                value : true
            },
            {
                key   : 'no',
                name  : 'No',
                value : false
            }
        ];

        let subItemIdIndex = this.itemId.length - 2;

        this.SUB_LIST = [
            {
                itemId          : this.itemId.slice(0, subItemIdIndex) + '.1' + this.itemId.slice(subItemIdIndex),
                display         : {},
                responseButtons : {},
                response        : {}
            }, {
                itemId          : this.itemId.slice(0, subItemIdIndex) + '.2' + this.itemId.slice(subItemIdIndex),
                display         : {},
                responseButtons : {},
                response        : {}
            }, {
                itemId          : this.itemId.slice(0, subItemIdIndex) + '.3' + this.itemId.slice(subItemIdIndex),
                display         : {},
                responseButtons : {},
                response        : {}
            }
        ];

        this.inHvacReport = this.inHvacReport || this.SPECIFIED_IN_HVAC_REPORT[0].key;
        this.subListShow  = this.subListShow || this.SPECIFIED_IN_HVAC_REPORT[0].value;

        documentIndex = _findIndex(this.SPECIFIED_IN_HVAC_REPORT, {key : this.inHvacReport});
        this.selectedSpecifiedInHvacReport = this.SPECIFIED_IN_HVAC_REPORT[documentIndex];

        for (let subListIndex in this.SUB_LIST) {
            let subList = this.SUB_LIST[subListIndex];
            this.DisplayLogicDigestService
                .get(subList.itemId)
                .then(display => {
                    subList.display = display;
                    subList.responseButtons = this.getResponseOptions();
                });

            this.JobChecklistStateService
                .getChecklistItemResponse(subList.itemId, this.itemCategory, this.itemCategoryProgress)
                .then(response => {
                    subList.response = response;
                });
        }
    }

    onSetResponse (Response, ItemId) {
        this.$rootScope.$emit(this.MESSAGING.UPDATE_CHECKLIST_RESPONSE, {
            'ItemId'           : ItemId,
            'Category'         : this.itemCategory,
            'CategoryProgress' : this.itemCategoryProgress,
            'Response'         : Response
        });
    }

    postComment (Comment, ItemId) {
        this.$rootScope.$emit(this.MESSAGING.POST_COMMENT, {
            'ItemId'           : ItemId,
            'Category'         : this.itemCategory,
            'CategoryProgress' : this.itemCategoryProgress,
            'Comment'          : Comment
        });
    }

    onSpecifiedInHvacReportChange () {
        this.subListShow = this.selectedSpecifiedInHvacReport.value;
    }

    onViewHvacDesignReport () {
        this.$rootScope.$emit(this.MESSAGING.VIEW_HVAC_DESIGN_REPORT);
    }
}

export default ChecklistItemAirInletLocationsController;
