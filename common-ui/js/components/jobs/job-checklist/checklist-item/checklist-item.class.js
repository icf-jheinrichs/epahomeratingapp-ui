class ChecklistItemClass {
    constructor ($rootScope, $stateParams, RESPONSES) {
        'ngInject';

        this.$rootScope   = $rootScope;
        this.$stateParams = $stateParams;
        this.RESPONSES    = RESPONSES;
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
        this.$rootScope.$emit('setResponse', {
            'ItemId'           : this.itemId,
            'Category'         : this.itemCategory,
            'CategoryProgress' : this.itemCategoryProgress,
            'Response'         : Response
        });
    }

    postComment (Comment) {
        this.$rootScope.$emit('postComment', {
            'ItemId'           : this.itemId,
            'Category'         : this.itemCategory,
            'CategoryProgress' : this.itemCategoryProgress,
            'Comment'          : Comment
        });

    }
}

export default ChecklistItemClass;
