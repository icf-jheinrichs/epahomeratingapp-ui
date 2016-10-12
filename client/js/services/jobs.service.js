class JobsService {
    constructor ($http, $q) {
        'ngInject';

        this.$http = $http;
        this.$q    = $q;
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

    put (job) {
        let deferred = this.$q.defer();

        deferred.resolve(job);

        return deferred.promise;
    }
}

export default JobsService;
