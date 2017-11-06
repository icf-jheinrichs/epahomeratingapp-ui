import PouchDB from 'pouchdb';

class PouchDBService {
    db () {
        return PouchDB;
    }

    getSyncingDB () {
        return ['db1', 'db2', 'db3'];
    }
}

export default PouchDBService;
