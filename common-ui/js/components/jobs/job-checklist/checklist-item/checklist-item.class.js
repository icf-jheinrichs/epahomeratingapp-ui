class ChecklistItemClass {
    constructor ($log, $q, $rootScope, $stateParams, UI_ENUMS, DisplayLogicDigestService, JobChecklistStateService, PopoverService) {
        'ngInject';

        this.$log         = $log;
        this.$q           = $q;
        this.$rootScope   = $rootScope;
        this.$stateParams = $stateParams;

        this.RESPONSES    = UI_ENUMS.RESPONSES;
        this.MESSAGING    = UI_ENUMS.MESSAGING;

        this.DisplayLogicDigestService = DisplayLogicDigestService;
        this.JobChecklistStateService  = JobChecklistStateService;
        this.PopoverService            = PopoverService;
    }

    $onInit () {
        this.DisplayLogicDigestService
            .get(this.itemId)
            .then(display => {
                this.display = display;

                this.responseButtons = this.getResponseOptions();
            });

        // this.JobChecklistStateService
        //     .getChecklistItemResponse(this.itemId, this.itemCategory, this.itemCategoryProgress)
        //     .then(response => {
        //         this.response = response;
        //     });
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
        if (this.response !== undefined && this.response[0] === this.RESPONSES.MustCorrect.Key && Response[0] === this.RESPONSES.RaterVerified.Key) {
            this
                .PopoverService
                .openPopover(this.itemId.replace(/\s/g, '_'))
                .catch((error) => {
                    this.$log.log(error);
                });
        }

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
