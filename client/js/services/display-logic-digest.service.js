class DisplayLogicDigestService {
    constructor ($http, $q, API_URL) {
        'ngInject';

        this.$http = $http;
        this.$q    = $q;

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
}

export default DisplayLogicDigestService;
