class ChecklistItemClass {
    constructor ($rootScope, RESPONSES, MESSAGING) {
        'ngInject';

        this.$rootScope   = $rootScope;
        this.RESPONSES    = RESPONSES;
        this.MESSAGING    = MESSAGING;
    }

    $onInit () {
        this.responseButtons = this.getResponseOptions();
    }

    getResponseOptions () {
        let responseOptions = [];
        let key;

        for (key in this.RESPONSES) {
            if (this.checklistItem.ResponseOptions[this.RESPONSES[key].Key]) {
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
