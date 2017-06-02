class ChecklistItemClass {
    constructor ($q, $rootScope, $stateParams, UI_ENUMS, DisplayLogicDigestService, JobChecklistStateService) {
        'ngInject';

        this.$q           = $q;
        this.$rootScope   = $rootScope;
        this.$stateParams = $stateParams;

        this.RESPONSES    = UI_ENUMS.RESPONSES;
        this.MESSAGING    = UI_ENUMS.MESSAGING;

        this.DisplayLogicDigestService = DisplayLogicDigestService;
        this.JobChecklistStateService  = JobChecklistStateService;
    }

    $onInit () {
        this.DisplayLogicDigestService
            .get(this.itemId)
            .then(display => {
                this.display = display;

                this.responseButtons = this.getResponseOptions();
            });

        this.JobChecklistStateService
            .getChecklistItemResponse(this.itemId, this.itemCategory, this.itemCategoryProgress)
            .then(response => {
                this.response = response;
            });
    }

    getResponseOptions () {
        let responseOptions = [];
        let key;

        for (key in this.RESPONSES) {
            if (this.display.ResponseOptions[this.RESPONSES[key].Key]) {
                responseOptions.push(this.RESPONSES[key]);
            }
        }

        return responseOptions;
    }

    onSetResponse (Response) {
        this.$rootScope.$emit(this.MESSAGING.UPDATE_CHECKLIST_RESPONSE, {
            'ItemId'           : this.itemId,
            'Category'         : this.itemCategory,
            'CategoryProgress' : this.itemCategoryProgress,
            'Response'         : Response
        });
    }

    setItemData (ItemData) {
        this.$rootScope.$emit(this.MESSAGING.UPDATE_CHECKLIST_ITEM_DATA, {
            'ItemId'           : this.itemId,
            'Category'         : this.itemCategory,
            'CategoryProgress' : this.itemCategoryProgress,
            'ItemData'         : ItemData
        });
    }

    postComment (Comment) {
        this.$rootScope.$emit(this.MESSAGING.POST_COMMENT, {
            'ItemId'           : this.itemId,
            'Category'         : this.itemCategory,
            'CategoryProgress' : this.itemCategoryProgress,
            'Comment'          : Comment
        });

    }
}

export default ChecklistItemClass;
