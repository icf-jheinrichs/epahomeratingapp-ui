class DisplayLogicDigestService {
    constructor ($http, API_URL) {
        'ngInject';

        this.$http = $http;

        this.API_URL = API_URL;

        this.digest = this.$http({
            method  : 'GET',
            url     : this.API_URL.DISPLAY_LOGIC_DIGEST
        });
    }

    get (id) {
        let checklistItemDisplay = this.digest
            .then(digest => {
                return digest.data.ChecklistItems[id];
            });


        return checklistItemDisplay;
    }
}

export default DisplayLogicDigestService;
