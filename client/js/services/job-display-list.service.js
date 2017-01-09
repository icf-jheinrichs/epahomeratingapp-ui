import PouchDB from 'pouchdb';

class JobDisplayListService {
    constructor ($q, DB) {
        'ngInject';

        this.$q    = $q;

        this.db    = new PouchDB(DB.JOB_DISPLAY_LIST);
    }

    getById (_id) {
        let promise = this.$q((resolve, reject) => {
            this
                .db
                .get(_id)
                .then((doc) => {
                    resolve(doc);
                })
                .catch((err) => {
                    reject(err);
                });
        });

        return promise;
    }
}

export default JobDisplayListService;
