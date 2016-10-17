import PouchDB from 'pouchdb';

class DisplayLogicDigestService {
    constructor (DB) {
        'ngInject';

        this.db = new PouchDB(DB.DISPLAY_LOGIC_DIGEST);

        this.digest = this.db.get('displaydigest:stable');
    }

    get (id) {
        let checklistItemDisplay = this.digest
            .then(digest => {
                return digest.ChecklistItems[id];
            });


        return checklistItemDisplay;
    }
}

export default DisplayLogicDigestService;
