class DisplayLogicDigestService {
    constructor ($http) {
        'ngInject';

        this.digest = $http
            .get('/api/display-logic/digest');
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
