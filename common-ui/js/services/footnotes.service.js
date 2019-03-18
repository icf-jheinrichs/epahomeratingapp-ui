import footnotes from "./footnotes.js";

class FootNotesService {

    constructor ($http, $q) {
        'ngInject';

        this.$http = $http;
        this.$q    = $q;   
    }

    fetchData (id) {
        return footnotes[id] || '';
    }
}

export default FootNotesService;
