import _cloneDeep from 'lodash/cloneDeep';

class DisplayLogicDigestService {
    constructor ($http, $q, API_URL, FootNotesService) {
        'ngInject';

        this.$http = $http;
        this.$q    = $q;

        this.FootNotesService = FootNotesService;

        this.API_URL   = API_URL;

        this.digest = this.$http({
            method  : 'GET',
            url     : this.API_URL.DISPLAY_LOGIC_DIGEST
        });

        this.digest.then((digest) => {
            this.syncDigest = digest;
        });
    }

    getPromise () {
        return this.digest;
    }

    get (id) {
        let checklistItemDisplay = this.digest
            .then(digest => {
                let checklistItem = _cloneDeep(digest.data.ChecklistItems[id]);
                checklistItem.Footnotes = this.FootNotesService.fetchData(id).Footnotes;
                return checklistItem;
            });


        return checklistItemDisplay;
    }

    getSync (id) {
        return this.syncDigest.data.ChecklistItems[id];
    }

    getEnum (Name) {
        return this.$q((resolve, reject) => {
            this.digest
                .then(digest => {
                    if (digest.data.Enums[Name]) {
                        resolve(digest.data.Enums[Name]);
                    } else {
                        reject('Not Found');
                    }
                });
        });
    }

    getDecimal (Name) {
        return this.$q((resolve, reject) => {
            this.digest
                .then(digest => {
                    if (digest.data.Decimals[Name]) {
                        resolve(digest.data.Decimals[Name]);
                    } else {
                        reject('Not Found');
                    }
                });
        });
    }

    getInteger (Name) {
        return this.$q((resolve, reject) => {
            this.digest
                .then(digest => {
                    if (digest.data.Integers[Name]) {
                        resolve(digest.data.Integers[Name]);
                    } else {
                        reject('Not Found');
                    }
                });
        });
    }

    getString (Name) {
        return this.$q((resolve, reject) => {
            this.digest
                .then(digest => {
                    if (digest.data.Strings[Name]) {
                        resolve(digest.data.Strings[Name]);
                    } else {
                        reject('Not Found');
                    }
                });
        });
    }

    getOrder () {
        return this.digest.then((digest) => {
            return digest.data.Order;
        });
    }
}

export default DisplayLogicDigestService;
