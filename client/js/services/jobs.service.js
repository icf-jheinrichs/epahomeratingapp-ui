class JobsService {
    constructor ($http) {
        'ngInject';

        this.$http = $http;
    }

    get () {
        let results
            = this
                .$http
                .get('/api/jobs');

        return results;
    }

    getById (id) {
        let results
            = this
                .$http
                .get('/api/jobs/' + id);

        return results;
    }
}

export default JobsService;
