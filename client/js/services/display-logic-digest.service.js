class DisplayLogicDigestService {
    constructor ($http, DB) {
        'ngInject';

        this.$http = $http;

        this.digest = this.$http({
            method  : 'GET',
            url     : 'https://37m3ie0ju8.execute-api.us-east-1.amazonaws.com/dev/display_logic/digest'
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
