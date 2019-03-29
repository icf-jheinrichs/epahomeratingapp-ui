import footnotes from './footnotes.js';

class FootNotesService {
    fetchData (id) {
        return footnotes[id] || {Footnotes : ''};
    }
}

export default FootNotesService;
